package com.rrpvm.server.security;

import com.rrpvm.server.dao.repository.UserRepository;

import com.rrpvm.server.service.JwtService;
import io.jsonwebtoken.MalformedJwtException;
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

@Component("jwtAuthorizationFilter")
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String requestHeader = request.getHeader("Authorization");
        if (requestHeader == null || requestHeader.length() < "Bearer ".length()) {//incorrect
            filterChain.doFilter(request, response);
            return;
        }
        String token = null;
        String username = null;
        token = requestHeader.substring("Bearer ".length());
        try {
            username = jwtService.getUsernameFromToken(token);
        } catch (MalformedJwtException | io.jsonwebtoken.SignatureException exception) {//incorrect
            filterChain.doFilter(request, response);
            return;
        }
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userRepository.findUserByUsername(username);
            if (userDetails != null) {
                try {
                    if (jwtService.validateToken(token, userDetails)) {
                        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                    } else {
                        SecurityContextHolder.getContext().setAuthentication(null);
                    }
                } catch (NullPointerException urlException) {//found authorization header in permit all path
                    filterChain.doFilter(request, response);
                    return;
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}


