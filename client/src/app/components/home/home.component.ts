import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/_models/BookDataModels';
import { AuthService } from 'src/app/_services/auth.service';
import { BookService } from 'src/app/_services/book.service';

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

  constructor(public authService: AuthService, private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    console.log(!this.authService.user$)
    // if(!this.authService.user$) {
    //   this.router.navigateByUrl('login')
    // }
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (response: any) => {
        console.log(response)
        this.books = JSON.parse(JSON.stringify(response.data.books));
        this.totalItems = this.books.length;
        // this.pageChanged({page: 1, itemsPerPage: this.itemsPerPage});
      }
    })
  }

  gotoBookDetail(bookId: string) {
    console.log(bookId);
    this.router.navigate([`/book-detail/${bookId}`]);
  }
}
