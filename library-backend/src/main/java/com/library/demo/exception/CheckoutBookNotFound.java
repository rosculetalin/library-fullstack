package com.library.demo.exception;

public class CheckoutBookNotFound extends RuntimeException {
    public CheckoutBookNotFound(String message) {
        super(message);
    }
}
