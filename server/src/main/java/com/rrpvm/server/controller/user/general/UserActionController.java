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
import org.springframework.web.bind.annotation.*;


import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/user/v1/action")
@CrossOrigin("http://localhost:3000")
public class UserActionController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ItemSellRepository itemRepository;

    @PutMapping("/cart_item")//получение своего профиля
    public ResponseEntity<User> addItemToCard(@AuthenticationPrincipal User user, @RequestBody Long itemId)
            throws UserDoesNotExistException, UserDataInvalidException {
        if (user == null) {
            throw new UserDoesNotExistException();
        }
        User dbUser = userRepository.findById(user.getId()).get();
        ItemSell item = itemRepository.findById(itemId).get();
        if (dbUser == null || item == null) {
            throw new UserDataInvalidException();
        }
        Cart oldCart = dbUser.getCart();
        List<CartItem> oldItems = oldCart.getItems();
        oldItems.add(new CartItem(item, new Date(), false, oldCart));
        oldCart.setItems(oldItems);
        dbUser.setCart(oldCart);
        userRepository.save(dbUser);
        return ResponseEntity.ok(dbUser);
    }
    @PutMapping("/")//получение своего профиля
    public ResponseEntity<User> deleteItemFromCart(@AuthenticationPrincipal User user, @RequestBody Long itemId)
            throws UserDoesNotExistException, UserDataInvalidException {
        if (user == null) {
            throw new UserDoesNotExistException();
        }
        User dbUser = userRepository.findById(user.getId()).get();
        ItemSell item = itemRepository.findById(itemId).get();
        if (dbUser == null || item == null) {
            throw new UserDataInvalidException();
        }
        Cart oldCart = dbUser.getCart();
        List<CartItem> oldItems = oldCart.getItems();
        oldItems.add(new CartItem(item, new Date(), false, oldCart));
        oldCart.setItems(oldItems);
        dbUser.setCart(oldCart);
        userRepository.save(dbUser);
        return ResponseEntity.ok(dbUser);
    }
}
