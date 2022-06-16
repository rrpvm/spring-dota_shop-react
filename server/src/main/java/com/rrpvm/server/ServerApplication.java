package com.rrpvm.server;


import com.rrpvm.server.dao.repository.UserRepository;
import com.rrpvm.server.model.entity.Cart;
import com.rrpvm.server.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {
    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder bCrypt;
    @Override
    public void run(String... args) throws Exception {
        if(userRepository.findUserByUsername("admin") != null)return;
        userRepository.save(new User("admin", bCrypt.encode("12345"), "ADMIN", new ArrayList<>(), new Cart()));
    }
}
