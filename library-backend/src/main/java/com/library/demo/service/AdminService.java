package com.library.demo.service;

import com.library.demo.dao.BookRepository;
import com.library.demo.dao.CheckoutRepository;
import com.library.demo.dao.ReviewRepository;
import com.library.demo.entity.Book;
import com.library.demo.exception.BookNotFoundException;
import com.library.demo.exception.BookQuantityLockedException;
import com.library.demo.request_models.AddBookRequest;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class AdminService {

    private BookRepository bookRepository;

    private CheckoutRepository checkoutRepository;

    private ReviewRepository reviewRepository;

    public AdminService(BookRepository bookRepository, CheckoutRepository checkoutRepository, ReviewRepository reviewRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        this.reviewRepository = reviewRepository;
    }

    public void postBook(AddBookRequest addBookRequest) {
        Book book = new Book();
        book.setTitle(addBookRequest.getTitle());
        book.setAuthor(addBookRequest.getAuthor());
        book.setDescription(addBookRequest.getDescription());
        book.setCopies(addBookRequest.getCopies());
        book.setCopiesAvailable(addBookRequest.getCopies());
        book.setCategory(addBookRequest.getCategory());
        book.setImg(addBookRequest.getImg());
        bookRepository.save(book);
    }
    
    public void increaseBookQuantity(Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);

        if (!book.isPresent()) {
            throw new BookNotFoundException("Book not found when trying to increase quantity");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);
        book.get().setCopies(book.get().getCopies() + 1);

        bookRepository.save(book.get());
    }

    public void decreaseBookQuantity(Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);

        if (!book.isPresent()) {
            throw new BookNotFoundException("Book not found when trying to decrease quantity");
        }

        if (book.get().getCopies() <= 0 || book.get().getCopiesAvailable() <= 0) {
            throw new BookQuantityLockedException("Book quantity is locked");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        book.get().setCopies(book.get().getCopies() - 1);

        bookRepository.save(book.get());
    }

    public void deleteBook(Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);

        if (!book.isPresent()) {
            throw new BookNotFoundException("Book not found when trying to delete book");
        }

        bookRepository.delete(book.get());
        checkoutRepository.deleteByBookId(bookId);
        reviewRepository.deleteByBookId(bookId);
    }
}
