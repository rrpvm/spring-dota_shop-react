package com.rrpvm.server.controller.user.general;

import com.rrpvm.server.dao.repository.ItemLogRepository;
import com.rrpvm.server.dao.repository.UserRepository;
import com.rrpvm.server.exception.user.UserDataInvalidException;
import com.rrpvm.server.exception.user.UserDoesNotExistException;
import com.rrpvm.server.model.entity.ItemSellLog;
import com.rrpvm.server.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/user/v1/item_logs")
@CrossOrigin("http://localhost:3000")
public class UserItemLogsController {//here we only get value( we can't add/delete something )
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ItemLogRepository itemLogRepository;

    @GetMapping("/log/list")//get log list of user
    public ResponseEntity<List<ItemSellLog>> getLogs(@AuthenticationPrincipal User user) throws UserDataInvalidException, UserDoesNotExistException {
        if (user == null) {
            throw new UserDataInvalidException();
        }
        User dbUser = userRepository.findById(user.getId()).get();
        if (dbUser == null) {
            throw new UserDoesNotExistException();
        }
        return ResponseEntity.ok(itemLogRepository.findItemSellLogsByConsumer(dbUser));
    }

    @GetMapping("/log")
    public ResponseEntity<ItemSellLog> getLogById(@AuthenticationPrincipal User user, @RequestParam(name = "log_id") Long logId)
            throws UserDataInvalidException, UserDoesNotExistException {
        if (user == null || logId == null) {
            throw new UserDataInvalidException();
        }
        User dbUser = userRepository.findById(user.getId()).get();
        if (dbUser == null) {
            throw new UserDoesNotExistException();
        }
        ItemSellLog result = itemLogRepository.findById(logId).get();
        if (result == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(result);
    }
}
