package com.rrpvm.server.controller.ipublic.general;

import com.rrpvm.server.model.entity.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/public/v1/access")
@CrossOrigin(origins = "http://localhost:3000")
public class PublicAccessTester {
    @GetMapping("/getAuthoritiesList")
    public Map<Object, Object> test(@AuthenticationPrincipal User user) {
        Map<Object, Object> response = new HashMap<>();
        if (user == null) {
            response.put("role", "");
        } else {
            response.put("role", user.getAuthorities());
        }
        return response;
    }
}

