package com.library.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BookAlreadyCheckoutException.class)
    public ResponseEntity handleBookAlreadyCheckoutException(BookAlreadyCheckoutException e) {
        return new ResponseEntity(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity handleBookNotFoundException(BookNotFoundException e) {
        return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CheckoutBookNotFound.class)
    public ResponseEntity handleCheckoutBookNotFound(CheckoutBookNotFound e) {
        return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MessageNotFoundException.class)
    public ResponseEntity handleMessageNotFoundException(MessageNotFoundException e) {
        return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ReviewConflictException.class)
    public ResponseEntity handleReviewConflictException(ReviewConflictException e) {
        return new ResponseEntity(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserNotAdminException.class)
    public ResponseEntity handleUserNotAdminException(UserNotAdminException e) {
        return new ResponseEntity(e.getMessage(), HttpStatus.FORBIDDEN);
    }
}
