package com.rrpvm.server.controller.user.general;

import com.rrpvm.server.dao.repository.ItemSellRepository;
import com.rrpvm.server.dao.repository.UserRepository;
import com.rrpvm.server.exception.user.UserDataInvalidException;
import com.rrpvm.server.exception.user.UserDoesNotExistException;
import com.rrpvm.server.model.entity.Cart;
import com.rrpvm.server.model.entity.CartItem;
import com.rrpvm.server.model.entity.ItemSell;
import com.rrpvm.server.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user/v1/cart")
@CrossOrigin("http://localhost:3000")
public class UserCartController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ItemSellRepository itemRepository;

    @PutMapping("/cart_item")//получение своего профиля
    public ResponseEntity<User> addItemToCard(@AuthenticationPrincipal User user, @RequestBody Long itemId)
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
        oldItems.add(new CartItem(item, new Date(), false, oldCart));
        oldCart.setItems(oldItems);
        dbUser.setCart(oldCart);
        userRepository.save(dbUser);
        return ResponseEntity.ok(dbUser);
    }

    @DeleteMapping("/cart_item")//получение своего профиля
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
        List<CartItem> oldItems = oldCart.getItems().stream().filter(item -> item.getId() != itemId).collect(Collectors.toList());
        oldCart.setItems(oldItems);
        dbUser.setCart(oldCart);
        userRepository.save(dbUser);
        return ResponseEntity.noContent().build();
    }
}
