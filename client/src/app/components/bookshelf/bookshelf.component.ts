import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { Book, BorrowedBook } from 'src/app/_models/BookDataModels';
import { AuthService } from 'src/app/_services/auth.service';
import { BookService } from 'src/app/_services/book.service';
import { BookshelfService } from 'src/app/_services/bookshelf.service';
import { PaymentService } from 'src/app/_services/payment.service';
import { UtilService } from 'src/app/_services/util.service';
import { environment } from 'src/environments/environment';

declare var Cashfree: any;

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

  cashfree: any;
  version: any;
  sessionId: String = '';
  orderId: String = '';

  loggedInUser: any;

  constructor(private bookshelfService: BookshelfService, private bookService: BookService, private router: Router,
    private toastrService: ToastrService, private authService: AuthService, private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.getBorrowedBooks();
    this.cashfree = Cashfree({
      mode: environment.cashfreeMode,
    });
    this.loggedInUser = this.authService.getCurrentUser();
  }

  getBorrowedBooks() {
    this.bookshelfService.getAllBorrowedBooks().subscribe({
      next: (response: any) => {
        console.log(response)
        this.borrowedBooks = JSON.parse(JSON.stringify(response.data.borrows));
        this.getBooks();
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
          book['overdueDuration'] = borrowedBook.overdueDuration
          book['isLate'] = borrowedBook.isLate
          this.books.push(response.data.book)
          this.totalItems = this.borrowedBooks.length;
          this.pageChanged({page: 1, itemsPerPage: this.itemsPerPage});
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
      next: (response: any) => {
        this.toastrService.success('Book returned successfully');
        if(response.data.borrowed.isLate) {
          this.toastrService.info('Book is returned late. Please pay the fine.');
        }  
        this.getBorrowedBooks();
      },
      error: err => {
        this.toastrService.error(err.message.message)
      }
    });
  }

  payLateFee(book: any) {
    let inputbody= {
      overdueDuration: book.overdueDuration,
      bookId: book.bookId
    }
    console.log(inputbody);

    this.paymentService.getSessionIdForLateFee(inputbody).subscribe({
      next: (response: any) => {
        this.sessionId = JSON.parse(JSON.stringify(response.payment_session_id));
        this.orderId = JSON.parse(JSON.stringify(response.order_id));
        this.handlePayment(book._id);
      },
      error: (error) => {
        this.toastrService.error(error.message);
      }
    });
  }

  handlePayment(bookId: string) {
    const inputbody = {
      orderId: this.orderId,
      bookId: bookId,
      userId: this.loggedInUser._id
    }
    const queryParams = new URLSearchParams({ inputbody: JSON.stringify(inputbody) });
    let checkoutOptions = {
      paymentSessionId: this.sessionId,
      returnUrl:
        `http://3.109.2.11:3000/api/payment/late-fee/status?orderId=${this.orderId}&bookId=${bookId}&userId=${this.loggedInUser._id}`,
    };
    this.cashfree.checkout(checkoutOptions).then( (result: any) => {
      if (result.error) {
        alert(result.error.message);
      }
      if (result.redirect) {
        console.log("Redirection");
      }
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedData = this.books.slice(startItem, endItem);
  }
}
