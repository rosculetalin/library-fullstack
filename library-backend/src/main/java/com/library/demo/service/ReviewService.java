package com.library.demo.service;

import com.library.demo.dao.ReviewRepository;
import com.library.demo.entity.Review;
import com.library.demo.exception.ReviewConflictException;
import com.library.demo.request_models.ReviewRequest;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {

    private ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, reviewRequest.getBookId());
        if (validateReview != null) {
            throw new ReviewConflictException("Review already created!");
        }

        Review review = new Review();
        review.setBookId(reviewRequest.getBookId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRequest.getReviewDescription().ifPresent(review::setReviewDescription);

        reviewRepository.save(review);
    }

    public Boolean userReviewListed(String userEmail, Long bookId) {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (validateReview != null) {
            return true;
        } else {
            return false;
        }
    }
}
