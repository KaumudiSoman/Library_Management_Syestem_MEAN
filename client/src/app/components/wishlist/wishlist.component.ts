import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Book } from 'src/app/_models/BookDataModels';
import { AuthService } from 'src/app/_services/auth.service';
import { BookService } from 'src/app/_services/book.service';
import { WishlistService } from 'src/app/_services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  books: Book[] = [];
  paginatedData: any[] = [];
  itemsPerPage: number = 10;
  totalItems: number = 0;
  wishlist: any[] = []

  userId: string = '';

  constructor(private wishlistService: WishlistService, private authService: AuthService, private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.userId = user?._id!;
      this.getWishList();
    });
  }

  getWishList() {
    this.wishlistService.getWishlist().subscribe({
      next: (response: any) => {
        this.wishlist = JSON.parse(JSON.stringify(response.wishlist));
        this.getBooks()
        
        this.totalItems = this.books.length;
        this.pageChanged({page: 1, itemsPerPage: this.itemsPerPage});
      }
    })
  }

  deleteFromWishlist(bookId: string) {
    this.wishlistService.deleteFromWishlist(bookId).subscribe({
      next: () => this.getWishList()
    })
  }

  getBooks() {
    this.wishlist.forEach(record => {
      this.bookService.getBook(record.bookId).subscribe({
        next: (response: any) => {
          this.books.push(response.data.book)
        }
      })
    })
    console.log(this.books);
  }

  gotoBookDetail(bookId: string) {
    console.log(bookId);
    this.bookService.setBookId(bookId);
    this.router.navigate(['/book-detail']);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedData = this.books.slice(startItem, endItem);
  }
}
