package com.rrpvm.server.service;

import com.rrpvm.server.dto.request.UserAuthorizationDTO;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.impl.DefaultClock;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.Map;
import java.util.HashMap;
import java.util.function.Function;

@Component
public class JwtService implements Serializable {
    private Clock clock = DefaultClock.INSTANCE;
    @Value("${rrpvm.jwt.key}")
    private String generateKey;
    @Value("${rrpvm.jwt.token.expiration.time}")
    private Long expiration;

    public String generateToken(UserAuthorizationDTO user) {
        final Date createdDate = clock.now();
        final Date expiration = calculateExpirationDate(createdDate);
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder().setClaims(claims).setSubject(user.getUsername()).setIssuedAt(createdDate)
                .setExpiration(expiration).signWith(SignatureAlgorithm.HS512, generateKey).compact();
    }

    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    private Date calculateExpirationDate(Date createdDate) {
        return new Date(createdDate.getTime() + expiration * 1000);
    }

    private Boolean isTokenExpired(String token) {
        boolean result = false;
        try {
            final Date expiration = getExpirationDateFromToken(token);
            result = expiration.before(clock.now());
        } catch (ExpiredJwtException exception) {
            result = false;
        }
        return result;
    }

    private Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) throws ExpiredJwtException, MalformedJwtException {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) throws ExpiredJwtException, MalformedJwtException {
        return Jwts.parser().setSigningKey(generateKey).parseClaimsJws(token).getBody();
    }
}
