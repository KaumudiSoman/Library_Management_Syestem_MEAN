import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResources } from '../app.constants';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  
  constructor(private http: HttpClient, private utilService: UtilService) { }

  getWishlist() {
    const headers = this.utilService.setAuthHeader();
    return this.http.get(APIResources.baseUrl + APIResources.wishlist, {headers});
  }

  addToWishlist(bookId: string) {
    const headers = this.utilService.setAuthHeader();
    return this.http.post(APIResources.baseUrl + APIResources.wishlist + `/${bookId}`, null, {headers});
  }

  deleteFromWishlist(bookId: string) {
    const headers = this.utilService.setAuthHeader();
    return this.http.delete(APIResources.baseUrl + APIResources.wishlist + `/${bookId}`, {headers});
  }
}