package com.rrpvm.server.controller.common;

import com.rrpvm.server.dao.repository.UserRepository;
import com.rrpvm.server.dto.request.UserAuthorizationDTO;
import com.rrpvm.server.exception.common.InvalidAuthorizationDataException;
import com.rrpvm.server.exception.common.UserAlreadyExistException;
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


@RestController
@RequestMapping("/common/v1/authorization")
@CrossOrigin("http://localhost:3000")
public class AuthorizationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/authorize")
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
        if (registrationData.getUsername() == null || registrationData.getPassword() == null) {
            throw new InvalidAuthorizationDataException();
        }
        if (userRepository.findUserByUsername(registrationData.getUsername()) != null) {
            throw new UserAlreadyExistException();
        }
        User user = new User(registrationData.getUsername(), passwordEncoder.encode(registrationData.getPassword()), "USER");
        userRepository.save(user);
        return ResponseEntity.ok().body(jwtService.generateToken(registrationData));
    }
    @GetMapping("/validate")
    public boolean validateAuthorization(){
        return SecurityContextHolder.getContext().getAuthentication() != null;
    }
    @ExceptionHandler({org.springframework.security.core.AuthenticationException.class})
    private ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        System.out.println(e.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler({org.springframework.http.converter.HttpMessageNotReadableException.class})
    private ResponseEntity<String> handleNotReadableException(org.springframework.http.converter.HttpMessageNotReadableException e) {
        return ResponseEntity.badRequest().body("request part is empty");
    }
}
