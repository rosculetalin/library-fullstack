package com.library.demo.controller;

import com.library.demo.entity.Message;
import com.library.demo.exception.UserNotAdminException;
import com.library.demo.request_models.AdminQuestionRequest;
import com.library.demo.service.MessageService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@AuthenticationPrincipal Jwt jwt, @RequestBody Message messageRequest) {
        String userEmail = jwt.getClaimAsString("sub");
        messageService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
//    @PreAuthorize("authentication.principal.claims['userType'] == 'admin'")
    public void putMessage(@AuthenticationPrincipal Jwt jwt, @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        String userEmail = jwt.getClaimAsString("sub");
        String admin = jwt.getClaimAsString("userType");
        if (!"admin".equals(admin)) {
            throw new UserNotAdminException("Administration page only");
        }
        messageService.putMessage(adminQuestionRequest, userEmail);
    }
}
