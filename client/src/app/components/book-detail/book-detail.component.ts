import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/_models/BookDataModels';
import { AuthService } from 'src/app/_services/auth.service';
import { BookService } from 'src/app/_services/book.service';
import { BookshelfService } from 'src/app/_services/bookshelf.service';
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

  constructor(private route: ActivatedRoute, private utilService: UtilService, private router: Router, 
    private bookService: BookService, private authService: AuthService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.getBookDetails();
  }

  getBookDetails() {
    this.bookId = this.bookService.getBookId();
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

  addToWishlist() {
  }

  addToBookshelf() {
  }
}
