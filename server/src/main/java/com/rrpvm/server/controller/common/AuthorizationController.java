package com.rrpvm.server.controller.common;

import com.rrpvm.server.dao.repository.UserRepository;
import com.rrpvm.server.dto.request.UserAuthorizationDTO;
import com.rrpvm.server.exception.common.InvalidAuthorizationDataException;
import com.rrpvm.server.exception.common.UserAlreadyExistException;
import com.rrpvm.server.model.entity.User;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Map;

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

    @PostMapping("/authorize")
    public ResponseEntity<Map<String, String>> authorize(@RequestBody UserAuthorizationDTO authenticationRequest) throws
            org.springframework.security.core.AuthenticationException,
            org.springframework.http.converter.HttpMessageNotReadableException,
            InvalidAuthorizationDataException {
        if (authenticationRequest == null ||
                authenticationRequest.getUsername() == null ||
                authenticationRequest.getPassword() == null)
            throw new InvalidAuthorizationDataException();
        SecurityContext securityContextHolder = SecurityContextHolder.getContext();
        securityContextHolder.setAuthentication(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())));


        Map<String, String> response = new HashMap<>();
        response.put("token", "1337");
        return ResponseEntity.ok(response);
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
        Map<String, Object> tokenData = new HashMap<>();
        tokenData.put("username", registrationData.getUsername());
        tokenData.put("password", registrationData.getPassword());
        JwtBuilder jwtBuilder = Jwts.builder();
        Calendar calendar = new GregorianCalendar();
        jwtBuilder.setExpiration(calendar.getTime());
        jwtBuilder.setClaims(tokenData);
        String key = "abc123";
        String token = jwtBuilder.signWith(SignatureAlgorithm.HS512, key).compact();
        return ResponseEntity.ok().body(token);
    }

    @ExceptionHandler({org.springframework.security.core.AuthenticationException.class})
    private ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler({org.springframework.http.converter.HttpMessageNotReadableException.class})
    private ResponseEntity<String> handleNotReadableException(org.springframework.http.converter.HttpMessageNotReadableException e) {
        return ResponseEntity.badRequest().body("request part is empty");
    }
}
