package com.rrpvm.server.controller.ipublic.view;

import com.rrpvm.server.dao.repository.UserRepository;
import com.rrpvm.server.dto.request.UserAuthorizationDTO;
import com.rrpvm.server.exception.ipublic.InvalidAuthorizationDataException;
import com.rrpvm.server.exception.ipublic.UserAlreadyExistException;
import com.rrpvm.server.model.entity.Cart;
import com.rrpvm.server.model.entity.User;
import com.rrpvm.server.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


@RestController
@RequestMapping("/public/v1/security")
@CrossOrigin("http://localhost:3000")
public class PublicAuthorizationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/authentication")
    public ResponseEntity<String> authorize(@RequestBody UserAuthorizationDTO authenticationRequest) throws
            org.springframework.security.core.AuthenticationException,
            org.springframework.http.converter.HttpMessageNotReadableException,
            InvalidAuthorizationDataException {
        if (authenticationRequest == null ||
                authenticationRequest.getUsername() == null ||
                authenticationRequest.getPassword() == null)
            throw new InvalidAuthorizationDataException();
        SecurityContext securityContextHolder = SecurityContextHolder.getContext();
        securityContextHolder.setAuthentication(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())));
        return ResponseEntity.ok(jwtService.generateToken(authenticationRequest));
    }

    @PostMapping("/registration")
    public ResponseEntity<String> registration(@RequestBody UserAuthorizationDTO registrationData) throws InvalidAuthorizationDataException, UserAlreadyExistException {
        if (registrationData.getUsername() == null ||
                registrationData.getPassword() == null ||
                registrationData.getUsername().trim().length() < 4 ||
                registrationData.getPassword().trim().length() < 8
        ) {
            throw new InvalidAuthorizationDataException();
        }
        if (userRepository.findUserByUsername(registrationData.getUsername()) != null) {
            throw new UserAlreadyExistException();
        }

        User user = new User(registrationData.getUsername(), passwordEncoder.encode(registrationData.getPassword()), "USER", new ArrayList<>(), new Cart());
        userRepository.save(user);
        return ResponseEntity.ok().
                body(jwtService.generateToken(registrationData));
    }

    @PutMapping("/logout")
    public void logout() {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            SecurityContextHolder.getContext().setAuthentication(null);
        }
    }


    @ExceptionHandler({org.springframework.security.core.AuthenticationException.class})
    private ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        // System.out.println(e.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler({org.springframework.http.converter.HttpMessageNotReadableException.class})
    private ResponseEntity<String> handleNotReadableException(org.springframework.http.converter.HttpMessageNotReadableException e) {
        return ResponseEntity.badRequest().body("request part is empty");
    }
}
