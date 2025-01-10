import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResources } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getSessionId(inputbody: any) {
    return this.http.post(APIResources.baseUrl + APIResources.payment + APIResources.order, inputbody);
  }
}
