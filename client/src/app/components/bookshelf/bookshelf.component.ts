import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
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
  books: any[] = [];
  paginatedData: any[] = [];
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(private bookshelfService: BookshelfService, private bookService: BookService, private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getBorrowedBooks();
  }

  getBorrowedBooks() {
    this.bookshelfService.getAllBorrowedBooks().subscribe({
      next: (response: any) => {
        console.log(response)
        this.borrowedBooks = JSON.parse(JSON.stringify(response.data.borrows));
        this.getBooks()
        this.totalItems = this.borrowedBooks.length;
        this.pageChanged({page: 1, itemsPerPage: this.itemsPerPage});
      }
    })
  }

  getBooks() {
    this.borrowedBooks.forEach(borrowedBook => {
      this.bookService.getBook(borrowedBook.bookId).subscribe({
        next: (response: any) => {
          let book = response.data.book
          book['issuedTimestamp'] = borrowedBook.issuedTimestamp
          book['dueDate'] = borrowedBook.dueDate
          book['returnTimestamp'] = borrowedBook.returnTimestamp
          book['status'] = borrowedBook.status
          this.books.push(response.data.book)
        }
      })
    })
    console.log(this.books)
  }

  gotoBookDetail(bookId: string) {
    console.log(bookId);
    this.router.navigate([`/book-detail/${bookId}`]);
  }

  returnBook(bookId: string) {
    this.bookshelfService.returnBook(bookId).subscribe({
      next: () => {
        this.toastrService.success('Book returned successfully');
        this.getBorrowedBooks()
      },
      error: err => {
        this.toastrService.error(err.message.message)
      }
    })
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedData = this.books.slice(startItem, endItem);
  }
}
