package com.example.vehiclerepair.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

public class JwtAuthenticationToken extends UsernamePasswordAuthenticationToken {

    public JwtAuthenticationToken(UserDetails principal) {
        super(principal, null, principal.getAuthorities());
    }
}
