package com.rrpvm.server.controller.user.view;

import com.rrpvm.server.dao.repository.UserRepository;
import com.rrpvm.server.exception.ipublic.UserAlreadyExistException;
import com.rrpvm.server.exception.user.UserDataInvalidException;
import com.rrpvm.server.exception.user.UserDoesNotExistException;
import com.rrpvm.server.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import java.util.Optional;

@RestController
@RequestMapping("/user/v1/profile")
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/:id")//частный случай
    public ResponseEntity<User> getUser(@PathVariable Long id) throws UserDoesNotExistException {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new UserDoesNotExistException();
        }
        return ResponseEntity.ok(user.get());
    }

    @GetMapping("/user")//получение своего профиля
    public ResponseEntity<User> getUser(@AuthenticationPrincipal User user) throws UserDoesNotExistException {
        if (user == null) {
            throw new UserDoesNotExistException();
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("/user")//мы не можем изменить данные другого пользователя(если мы юзер)
    public ResponseEntity<Boolean> getUser(@AuthenticationPrincipal User user, User new_user) throws
            UserDoesNotExistException,
            UserDataInvalidException,
            UserAlreadyExistException {
        if (user == null) {
            throw new UserDoesNotExistException();
        }
        if (new_user.getUsername() == null
                || new_user.getUsername().trim().length() < 4) {
            throw new UserDataInvalidException();
        }
        final User maybeExistingUser = userRepository.findUserByUsername(new_user.getUsername());
        if (maybeExistingUser != null) {
            throw new UserAlreadyExistException();
        }
        user.setUsername(new_user.getUsername());
        userRepository.save(user);
        return ResponseEntity.ok(true);
    }
}
