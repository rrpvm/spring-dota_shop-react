package com.rrpvm.server.controller.admin.general;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/v1/test")
@CrossOrigin(origins = "http://localhost:3000")
public class Test {
    @GetMapping("")
    public String test(){
        return "Success";
    }
}
