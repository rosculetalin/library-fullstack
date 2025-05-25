package com.library.demo.service;

import com.library.demo.dao.BookRepository;
import com.library.demo.entity.Book;
import com.library.demo.request_models.AddBookRequest;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AdminService {

    private BookRepository bookRepository;

    public AdminService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
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
}
