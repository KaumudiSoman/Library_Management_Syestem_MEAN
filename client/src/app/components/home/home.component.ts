import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Book } from 'src/app/_models/BookDataModels';
import { AuthService } from 'src/app/_services/auth.service';
import { BookService } from 'src/app/_services/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  paginatedData: any[] = [];
  itemsPerPage: number = 10;
  totalItems: number = 0;

  expandedBooks: { [key: string]: boolean } = {};
  maxLength: number = 500;

  searchForm: FormGroup = new FormGroup({});

  constructor(public authService: AuthService, private bookService: BookService, private router: Router,
    private fb: FormBuilder, private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    // console.log(this.authService.currentUserSource.getValue())
    firstValueFrom(this.authService.user$).then(user => {
      console.log(user);
    });
    // if(!this.authService.user$) {
    //   this.router.navigateByUrl('login')
    // }
    this.initializeSearchForm();
    this.getAllBooks();
  }

  initializeSearchForm() {
    this.searchForm = this.fb.group({
      criteria: ['title'],
      query: ['', Validators.required]
    });
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (response: any) => {
        console.log(response)
        this.books = JSON.parse(JSON.stringify(response.data.books));
        this.totalItems = this.books.length;
        this.pageChanged({page: 1, itemsPerPage: this.itemsPerPage});
      },
      error: (err) => {
        this.toastrService.error(err.error.message)
      }
    })
  }

  gotoBookDetail(bookId: string) {
    console.log(bookId);
    this.router.navigate([`/book-detail/${bookId}`]);
  }

  searchBooks() {
    const formvalue = this.searchForm.value;
    let inputbody = {
      criteria: String(formvalue.criteria),
      query: String(formvalue.query)
    }

    this.bookService.searchBooks(inputbody).subscribe({
      next: (response: any) => {
        this.books = JSON.parse(JSON.stringify(response.books));
        this.totalItems = this.books.length;
        this.pageChanged({page: 1, itemsPerPage: this.itemsPerPage});
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
      }
    })
  }

  toggleContent(bookId: string) {
    this.expandedBooks[bookId] = !this.expandedBooks[bookId];
  }

  isExpanded(bookId: string): boolean {
    return !!this.expandedBooks[bookId];
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedData = this.books.slice(startItem, endItem);
  }
}
