package com.library.demo.controller;

import com.library.demo.entity.Review;
import com.library.demo.request_models.ReviewRequest;
import com.library.demo.service.ReviewService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/secure/user/book")
    public Boolean reviewBookByUser(@AuthenticationPrincipal Jwt jwt, @RequestParam Long bookId) {
        String userEmail = jwt.getClaimAsString("sub");
        return reviewService.userReviewListed(userEmail, bookId);
    }

    @PostMapping("/secure")
    public void postReview(@AuthenticationPrincipal Jwt jwt, @RequestBody ReviewRequest reviewRequest) {
        String userEmail = jwt.getClaimAsString("sub");
        reviewService.postReview(userEmail, reviewRequest);
    }
}
