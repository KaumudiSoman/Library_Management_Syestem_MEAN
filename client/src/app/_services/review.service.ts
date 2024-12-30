import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { APIResources } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient, private utilService: UtilService) { }

  addReview(review: String, bookId: String) {
    const headers = this.utilService.setAuthHeader();
    return this.http.post(APIResources.baseUrl + APIResources.reviews + `/${bookId}`, {review: review}, {headers});
  }

  getReviews(bookId: String) {
    const headers = this.utilService.setAuthHeader();
    return this.http.get(APIResources.baseUrl + APIResources.reviews + `/${bookId}`, {headers});
  }
}
