package com.library.demo.controller;

import com.library.demo.entity.Book;
import com.library.demo.service.CheckoutBookService;
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
    public Book checkoutBook(@RequestParam Long bookId) throws Exception {
        String userEmail = "testUser";
        return checkoutBookService.computeCheckoutBook(userEmail, bookId);
    }

    @GetMapping("/secure/isCheckedOut/byUser")
    public Boolean checkoutBookByUser(@RequestParam Long bookId) {
        String userEmail = "testUser@gmail.com";
        return checkoutBookService.userCheckedOutBooks(userEmail, bookId);
    }

    @GetMapping("/secure/currentLoans/count")
    public int currentLoansCount() {
        String userEmail = "testUser@gmail.com";
        return checkoutBookService.currentLoansCount(userEmail);
    }
}
