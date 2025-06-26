package com.library.demo.controller;

import com.library.demo.entity.Book;
import com.library.demo.response_models.ShelfCurrentLoansResponse;
import com.library.demo.service.CheckoutBookService;
import com.library.demo.exception.BookNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("https://localhost:3000")
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

    @GetMapping("/secure/currentLoans")
    public List<ShelfCurrentLoansResponse> currentLoans(@AuthenticationPrincipal Jwt jwt) throws Exception {
        String userEmail = jwt.getClaimAsString("sub");
        return checkoutBookService.currentLoans(userEmail);
    }

    @PutMapping("/secure/return")
    public void returnBook(@AuthenticationPrincipal Jwt jwt, @RequestParam Long bookId) throws BookNotFoundException, Exception {
        String userEmail = jwt.getClaimAsString("sub");
        checkoutBookService.returnBook(userEmail, bookId);
    }

    @PutMapping("/secure/renew/loan")
    public void renewLoan(@AuthenticationPrincipal Jwt jwt, @RequestParam Long bookId) throws Exception {
        String userEmail = jwt.getClaimAsString("sub");
        checkoutBookService.renewLoan(userEmail, bookId);
    }
}
