package com.library.demo.exception;

public class BookAlreadyCheckoutException extends RuntimeException {
    public BookAlreadyCheckoutException(String message) {
        super(message);
    }
}
