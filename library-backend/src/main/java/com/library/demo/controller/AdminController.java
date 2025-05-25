package com.library.demo.controller;

import com.library.demo.exception.UserNotAdminException;
import com.library.demo.request_models.AddBookRequest;
import com.library.demo.service.AdminService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/secure/add/book")
    public void postBook(@AuthenticationPrincipal Jwt jwt, @RequestBody AddBookRequest addBookRequest) throws Exception {
        String admin = jwt.getClaimAsString("userType");
        if (!"admin".equals(admin)) {
            throw new UserNotAdminException("Administration page only");
        }
        adminService.postBook(addBookRequest);
    }
}
