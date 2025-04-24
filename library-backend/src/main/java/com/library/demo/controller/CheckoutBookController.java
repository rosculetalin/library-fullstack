package com.library.demo.controller;

import com.library.demo.entity.Book;
import com.library.demo.service.CheckoutBookService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http//localhost:3000")
@RestController
@RequestMapping("/api/books")
public class CheckoutBookController {

    private CheckoutBookService checkoutBookService;

    public CheckoutBookController(CheckoutBookService checkoutBookService) {
        this.checkoutBookService = checkoutBookService;
    }

    @PutMapping("/secure/checkout")
    public Book checkoutBook(@AuthenticationPrincipal Jwt jwt,
                             @RequestParam Long bookId) throws Exception {
        String userEmail = jwt.getClaimAsString("sub");
        return checkoutBookService.computeCheckoutBook(userEmail, bookId);
    }

    @GetMapping("/secure/isCheckedOut/byUser")
    public Boolean checkoutBookByUser(@AuthenticationPrincipal Jwt jwt,
                                      @RequestParam Long bookId) {
        String userEmail = jwt.getClaimAsString("sub");
        return checkoutBookService.userCheckedOutBooks(userEmail, bookId);
    }

    @GetMapping("/secure/currentLoans/count")
    public int currentLoansCount(@AuthenticationPrincipal Jwt jwt) {
        String userEmail = jwt.getClaimAsString("sub");
        return checkoutBookService.currentLoansCount(userEmail);
    }
}
