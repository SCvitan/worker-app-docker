package com.example.workapp.controller;

import com.example.workapp.dto.AuthResponse;
import com.example.workapp.dto.LoginRequest;
import com.example.workapp.dto.AuthRequest;
import com.example.workapp.security.JwtProvider;
import com.example.workapp.service.UserProfileService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private JwtProvider jwtProvider;


    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody AuthRequest request){
        AuthResponse authResponse = userProfileService.registerUser(request);
        return ResponseEntity.ok()
                .body(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request, HttpServletResponse response) {
        AuthResponse authResponse = userProfileService.login(request);

        Cookie cookie = new Cookie("jwt", authResponse.getJwt());
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);

        response.addCookie(cookie);

        authResponse.setJwt(null);
        authResponse.setMessage("Login successful");

        return ResponseEntity.ok()
                .body(authResponse);
    }


    @GetMapping("/check")
    public ResponseEntity<?> checkAuth(HttpServletRequest request) {
        // Get the JWT token from the cookies
        String token = getJwtFromCookies(request);

        if (token == null) {
            // If the token is not found in the cookies, return Unauthorized
            return ResponseEntity.status(401).body("No token provided");
        }

        try {
            // Verify the JWT token
            jwtProvider.verifyJwtToken(token); // Assuming your JwtProvider class has this method

            // If verification succeeds, return OK (200)
            return ResponseEntity.ok().build();
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(401).body("Token has expired");
        } catch (SignatureException e) {
            return ResponseEntity.status(401).body("Invalid token signature");
        } catch (Exception e) {
            // Catch any other exceptions and return a generic Unauthorized response
            return ResponseEntity.status(401).body("Invalid token");
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie jwtCookie = new Cookie("jwt", null); // Clear the JWT cookie
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0);
        response.addCookie(jwtCookie);

        return ResponseEntity.ok("Logged out successfully");
    }

    private String getJwtFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null; // Return null if no JWT cookie is found
    }

}
