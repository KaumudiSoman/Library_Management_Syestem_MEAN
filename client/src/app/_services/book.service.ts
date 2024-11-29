import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../_models/BookDataModels';
import { APIResources } from '../app.constants';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookDetailId: string = '';

  constructor(private http: HttpClient, private utilService: UtilService) { }

  getAllBooks() {
    const headers = this.utilService.setAuthHeader();
    return this.http.get(APIResources.baseUrl + APIResources.books, {headers});
  }

  getBook(bookId: string) {
    const headers = this.utilService.setAuthHeader();
    return this.http.get(APIResources.baseUrl + APIResources.books + `/${bookId}`, {headers});
  }

  createBook(book: Book) {
    const headers = this.utilService.setAuthHeader();
    return this.http.post(APIResources.baseUrl + APIResources.books, book, {headers});
  }

  deleteBook(bookId: string) {
    const headers = this.utilService.setAuthHeader();
    return this.http.delete(APIResources.baseUrl + APIResources.books + `/${bookId}`, {headers});
  }

  setBookId(id: string): void {
    this.bookDetailId = id;
  }

  getBookId(): string {
    return this.bookDetailId;
  }
}
