package com.rrpvm.server.security;

import com.rrpvm.server.dao.repository.UserRepository;

import com.rrpvm.server.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component("jwtAuthorizationFilter")
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;
    private int prefixLength = "Bearer ".length();

    private Optional<String> requestValidate(HttpServletRequest request) {
        final String requestHeader = request.getHeader("Authorization");
        if (requestHeader == null || requestHeader.isEmpty() || requestHeader.length() < prefixLength) {
            return Optional.empty();
        }
        String token = null;
        token = requestHeader.substring(prefixLength);
        return Optional.of(token);
    }

    private Optional<UserDetails> jwtValidate(String jwt) {
        String username = null;
        try {
            username = jwtService.getUsernameFromToken(jwt);
        } catch (Exception exception) {
            return Optional.empty();
        }
        if (username.isEmpty()) {
            return Optional.empty();
        }
        UserDetails userDetails = this.userRepository.findUserByUsername(username);
        if (userDetails == null) return Optional.empty();
        try {
            if (!jwtService.validateToken(jwt)) return Optional.empty();
        } catch (NullPointerException urlException) {
            return Optional.empty();
        }
        return Optional.of(userDetails);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException, ExpiredJwtException {
        Optional<String> jwtToken = requestValidate((request));
        if (!jwtToken.isEmpty()) {
            Optional<UserDetails> userDetails = jwtValidate(jwtToken.get());
            if (!jwtValidate(jwtToken.get()).isEmpty()) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails.get(), null, userDetails.get().getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            } else {
                SecurityContextHolder.getContext().setAuthentication(null);
            }
        }
        try {
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            logger.error("Spring Security Filter Chain Exception:", e);
        }
    }
}



