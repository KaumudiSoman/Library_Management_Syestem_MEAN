import { Component } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Book, BorrowedBook } from 'src/app/_models/BookDataModels';
import { AuthService } from 'src/app/_services/auth.service';
import { BookService } from 'src/app/_services/book.service';
import { BookshelfService } from 'src/app/_services/bookshelf.service';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent {
  borrowedBooks: BorrowedBook[] = [];
  books: Book[] = [];
  paginatedData: any[] = [];
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(private bookshelfService: BookshelfService, private authService: AuthService, private bookService: BookService) { }

  ngOnInit(): void {
    this.getBorrowedBooks();
  }

  getBorrowedBooks() {
    this.bookshelfService.getAllBorrowedBooks().subscribe({
      next: (response: any) => {
        console.log(response)
        this.borrowedBooks = JSON.parse(JSON.stringify(response.data.borrows));
        this.totalItems = this.borrowedBooks.length;
        // this.pageChanged({page: 1, itemsPerPage: this.itemsPerPage});
      }
    })
  }

  // pageChanged(event: PageChangedEvent): void {
  //   const startItem = (event.page - 1) * event.itemsPerPage;
  //   const endItem = event.page * event.itemsPerPage;
  //   this.paginatedData = this.books.slice(startItem, endItem);
  // }
}
