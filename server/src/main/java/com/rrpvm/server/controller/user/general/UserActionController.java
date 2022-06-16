package com.rrpvm.server.controller.user.general;

import com.rrpvm.server.dao.repository.ItemSellRepository;
import com.rrpvm.server.dao.repository.UserRepository;
import com.rrpvm.server.exception.user.UserDoesNotExistException;
import com.rrpvm.server.model.entity.ItemSell;
import com.rrpvm.server.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user/v1/action")
@CrossOrigin("http://localhost:3000")
public class UserActionController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ItemSellRepository itemRepository;

    @PutMapping("/add_item_to_cart")//получение своего профиля
    public ResponseEntity<User> getUser(@AuthenticationPrincipal User user, @RequestBody int itemId) throws UserDoesNotExistException {
        if (user == null) {
            throw new UserDoesNotExistException();
        }
        User dbUser = userRepository.findById(user.getId()).get();
      //  dbUser.setBuyLogs(  dbUser.getBuyLogs().add() );
        return null;
    }
}