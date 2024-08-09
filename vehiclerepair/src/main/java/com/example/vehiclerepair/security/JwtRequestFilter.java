package com.example.vehiclerepair.security;

import java.io.IOException;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.vehiclerepair.model.Admin;
import com.example.vehiclerepair.model.User;
import com.example.vehiclerepair.service.AdminService;
import com.example.vehiclerepair.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final AdminService adminService;

    public JwtRequestFilter(JwtUtil jwtUtil, UserService userService, AdminService adminService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.adminService = adminService;
    }

    @Override
    @Lazy
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String email = null;
        String jwtToken = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7);
            email = jwtUtil.extractUsername(jwtToken);
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (userService.existsByEmail(email)) {
                if (jwtUtil.validateToken(jwtToken, email)) {
                    User user = userService.findByEmail(email);
                    UserDetails userDetails = new CustomUserDetails(user);
                    SecurityContextHolder.getContext().setAuthentication(new JwtAuthenticationToken(userDetails));
                }
            } else {
                Admin admin = adminService.findAdminByEmail(email);
                if (admin != null && jwtUtil.validateToken(jwtToken, email)) {
                    UserDetails adminDetails = new CustomAdminDetails(admin);
                    SecurityContextHolder.getContext().setAuthentication(new JwtAuthenticationToken(adminDetails));
                }
            }
        }

        chain.doFilter(request, response);
    }
}
