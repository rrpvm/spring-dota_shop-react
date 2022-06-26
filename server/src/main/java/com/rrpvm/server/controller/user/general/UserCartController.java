package com.rrpvm.server.controller.user.general;

import com.rrpvm.server.dao.repository.CartItemRepository;
import com.rrpvm.server.dao.repository.ItemSellRepository;
import com.rrpvm.server.dao.repository.UserRepository;
import com.rrpvm.server.exception.user.UserDataInvalidException;
import com.rrpvm.server.exception.user.UserDoesNotExistException;
import com.rrpvm.server.model.entity.Cart;
import com.rrpvm.server.model.entity.CartItem;
import com.rrpvm.server.model.entity.ItemSell;
import com.rrpvm.server.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user/v1/cart")
@CrossOrigin("http://localhost:3000")
public class UserCartController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ItemSellRepository itemRepository;
    @Autowired
    private CartItemRepository cartItemRepository;

    @GetMapping
    public ResponseEntity<Cart> getCart(@AuthenticationPrincipal User user)
            throws UserDataInvalidException, UserDoesNotExistException {
        if (user == null) {
            throw new UserDataInvalidException();
        }
        User dbUser = userRepository.findById(user.getId()).get();
        if (dbUser == null) {
            throw new UserDoesNotExistException();
        }
        return ResponseEntity.ok(dbUser.getCart());
    }

    //return always only enabled
    @GetMapping("/item/list")
    public ResponseEntity<List<CartItem>> getCartItems(@AuthenticationPrincipal User user)
            throws UserDataInvalidException, UserDoesNotExistException {
        if (user == null) {
            throw new UserDataInvalidException();
        }
        User dbUser = userRepository.findById(user.getId()).get();
        if (dbUser == null) {
            throw new UserDoesNotExistException();
        }
        return ResponseEntity.ok(
                dbUser.getCart().getItems()
                        .stream()
                        .filter(item -> !item.isDeleted())
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("/item")
    public ResponseEntity<CartItem> getCartItem(@AuthenticationPrincipal User user,
                                                @RequestParam(name = "cart_item_id") Long cartItemId)
            throws UserDataInvalidException, UserDoesNotExistException {
        if (user == null) {
            throw new UserDataInvalidException();
        }
        User dbUser = userRepository.findById(user.getId()).get();
        if (dbUser == null) {
            throw new UserDoesNotExistException();
        }
        Optional<CartItem> result = cartItemRepository.findById(cartItemId);
        if (result.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(result.get());
    }

    @PutMapping("/item")
    public ResponseEntity addItemToCard(@AuthenticationPrincipal User user, @RequestBody Long itemId)
            throws UserDoesNotExistException, UserDataInvalidException {
        if (user == null) {
            throw new UserDataInvalidException();
        }
        User dbUser = userRepository.findById(user.getId()).get();
        ItemSell item = itemRepository.findById(itemId).get();
        if (dbUser == null || item == null) {
            throw new UserDoesNotExistException();
        }
        Cart oldCart = dbUser.getCart();
        List<CartItem> oldItems = oldCart.getItems();
        if (oldItems.stream().
                filter(streamItem -> !streamItem.isDeleted() &&
                        streamItem.getItem().getItemId() == itemId).count() > 0) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("item is already in cart");
        }

        oldItems.add(new CartItem(item, new Date(), false, oldCart));
        oldCart.setItems(oldItems);
        dbUser.setCart(oldCart);
        userRepository.save(dbUser);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/item")
    public ResponseEntity deleteItemFromCart(@AuthenticationPrincipal User user, @RequestParam(name = "id", required = true) Long itemId)
            throws UserDoesNotExistException, UserDataInvalidException {
        if (user == null || itemId == null) {
            throw new UserDataInvalidException();
        }
        User dbUser = userRepository.findById(user.getId()).get();
        if (dbUser == null) {
            throw new UserDoesNotExistException();
        }
        Cart oldCart = dbUser.getCart();
        List<CartItem> oldItems = oldCart.getItems();
        oldItems.forEach(item_m -> {
            if (item_m.getItem().getItemId() == itemId)
                item_m.setDeleted(true);
        });
        oldCart.setItems(oldItems);
        dbUser.setCart(oldCart);
        userRepository.save(dbUser);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity clearCart(@AuthenticationPrincipal User user)
            throws UserDataInvalidException, UserDoesNotExistException {
        if (user == null) {
            throw new UserDataInvalidException();
        }
        User dbUser = userRepository.findById(user.getId()).get();
        if (dbUser == null) {
            throw new UserDoesNotExistException();
        }
        Cart oldCart = dbUser.getCart();
        List<CartItem> oldItems = oldCart.getItems();
        oldItems.forEach(item_m -> {
            item_m.setDeleted(true);
        });
        oldCart.setItems(oldItems);
        dbUser.setCart(oldCart);
        userRepository.save(dbUser);
        return ResponseEntity.noContent().build();
    }
}
