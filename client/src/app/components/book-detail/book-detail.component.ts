import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/_models/BookDataModels';
import { AuthService } from 'src/app/_services/auth.service';
import { BookService } from 'src/app/_services/book.service';
import { BookshelfService } from 'src/app/_services/bookshelf.service';
import { RateService } from 'src/app/_services/rate.service';
import { ReviewService } from 'src/app/_services/review.service';
import { UtilService } from 'src/app/_services/util.service';
import { WishlistService } from 'src/app/_services/wishlist.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  bookId: string = '';
  book: Book = {} as Book;
  selectedBook: Book = {} as Book;

  userId: string = '';

  readMode: string = 'Read More';
  showFullContent: boolean = false;
  maxLength: number = 400;

  stars: number[] = [0, 1, 2, 3, 4];
  currentRating: number = 0;

  reviews: any[] = [];
  reviewForm: FormGroup = new FormGroup({});

  constructor(private wishlistService: WishlistService, private rateService: RateService, private reviewService: ReviewService,
    private bookService: BookService, private borrowService: BookshelfService, private toastrService: ToastrService,
    private fb: FormBuilder, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeReviewForm();
    this.getBookDetails();
    this.getReviews();
  }

  getBookDetails() {
    this.router.paramMap.subscribe((params) => {
      this.bookId = params.get('id')!;
    })
    
    console.log(this.bookId);
    this.bookService.getBook(this.bookId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.book = JSON.parse(JSON.stringify(response.data.book));
      }
    })
  }

  toggleContent() {
    this.showFullContent = !this.showFullContent;
    if(this.showFullContent) {
      this.readMode = 'Read Less';
    }
    else {
      this.readMode = 'Read More';
    }
  }

  addToWishlist(bookId: string) {
    this.wishlistService.addToWishlist(bookId).subscribe({
      next: () => {
        this.toastrService.success('Book added to the wishlist')
      },
      error: err => {
        this.toastrService.error(err.error.message)
      }
    })
  }

  borrow(bookId: string) {
    this.borrowService.borrowBook(bookId).subscribe({
      next: () => {
        this.toastrService.success('Book borrowed successfully')
      },
      error: err => {
        this.toastrService.error(err.error.message);
      }
    })
  }

  addRating(rating: number) {
    this.currentRating = rating;
    console.log(this.currentRating);

    this.rateService.addUserRating(rating, this.bookId).subscribe({
      next: (response: any) => {
        let message = JSON.parse(JSON.stringify(response.message));
        this.toastrService.success(message);
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
      }
    })
  }

  getReviews() {
    this.reviewService.getReviews(this.bookId).subscribe({
      next: (response: any) => {
        this.reviews = JSON.parse(JSON.stringify(response.reviews));
        console.log(this.reviews)
      }
    })
  }

  initializeReviewForm() {
    this.reviewForm = this.fb.group({
      review: ['']
    });
  }

  addReview() {
    const formValue = this.reviewForm.value;
    console.log(formValue)
    this.reviewService.addReview(String(formValue.review), this.bookId).subscribe({
      next: () => {
        this.getReviews();
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
      }
    })
  }
}
