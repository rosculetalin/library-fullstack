package com.library.demo.exception;

public class ReviewConflictException extends RuntimeException {
    public ReviewConflictException(String message) {
        super(message);
    }
}
