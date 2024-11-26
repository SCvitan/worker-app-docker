package com.example.workapp.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;

@Service
public class JwtProvider {

    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth){
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        String roles = populateAuthorities(authorities);

        String jwt = Jwts.builder().setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+ 86400000 ))
                .claim("email", auth.getName())
                .claim("authorities", roles)
                .signWith(key)
                .compact();
        
        return jwt;
    }

    public String getEmailFromJwtToken(String jwt) {


        try {
            // Create JwtParser using Jwts.parser() and chaining with the appropriate methods
            JwtParser jwtParser = Jwts.parser()
                    .setSigningKey(key)  // Specify the signing key (replace with your actual key)
                    .build();  // Build the parser

            // Parse the JWT and extract claims
            Claims claims = jwtParser.parseClaimsJws(jwt).getBody();

            // Safely extract the email claim
            String email = claims.get("email", String.class);  // Directly specify the expected type (String)

            if (email == null) {
                throw new RuntimeException("Email claim is missing in the JWT.");
            }

            return email;
        } catch (JwtException e) {
            throw new RuntimeException("JWT parsing error.", e);
        }
    }

    // Method to verify the JWT token
    public void verifyJwtToken(String token) throws ExpiredJwtException, SignatureException {
        // Use JwtParserBuilder instead of Jwts.parser()
        Jwts.parser()
                .setSigningKey(key)  // Set the signing key
                .build()                   // Build the JwtParser
                .parseClaimsJws(token);    // This will throw exceptions if invalid or expired
    }

    private String populateAuthorities(Collection<? extends GrantedAuthority > authorities) {
        Set<String> auths = new HashSet<>();

        for (GrantedAuthority authority:authorities){
            auths.add(authority.getAuthority());
        }
        return String.join(",", auths);
    }

}
