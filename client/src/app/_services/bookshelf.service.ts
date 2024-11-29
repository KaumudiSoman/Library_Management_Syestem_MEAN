import { inject, Injectable } from '@angular/core';
import { Book } from '../_models/BookDataModels';
import { from, map, Observable } from 'rxjs';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIResources } from '../app.constants';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class BookshelfService {

  constructor(private http: HttpClient, private utilService: UtilService) { }

  getAllBorrowedBooks() {
    const headers = this.utilService.setAuthHeader();
    return this.http.get(APIResources.baseUrl + APIResources.mybooks, {headers});
  }

  borrowBook(bookId: string) {
    const headers = this.utilService.setAuthHeader();
    return this.http.post(APIResources.baseUrl + APIResources.mybooks + APIResources.borrow + `/${bookId}`, null, {headers});
  }

  returnBook(bookId: string) {
    const headers = this.utilService.setAuthHeader();
    return this.http.post(APIResources.baseUrl + APIResources.mybooks + APIResources.return + `/${bookId}`, null, {headers});
  }
}
