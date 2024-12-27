import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResources } from '../app.constants';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private http: HttpClient, private utilService: UtilService) { }

  addUserRating(rating: Number, bookId: String) {
    const headers = this.utilService.setAuthHeader();
    return this.http.post(APIResources.baseUrl + APIResources.rating + `/${bookId}`, rating, {headers});
  }

  getAvgRating(bookId: String) {
    const headers = this.utilService.setAuthHeader();
    return this.http.get(APIResources.baseUrl + APIResources.avgRating + `/${bookId}`, {headers});
  }

  getUserRating(bookId: String) {
    const headers = this.utilService.setAuthHeader();
    return this.http.get(APIResources.baseUrl + APIResources.rating + `/${bookId}`, {headers});
  }
}
