package com.library.demo.exception;

public class BookQuantityLockedException extends RuntimeException {

    public BookQuantityLockedException(String message) {
        super(message);
    }
}
