import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResources } from '../app.constants';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private utilService: UtilService) { }

  getSessionIdForMembership(inputbody: any) {
    return this.http.post(APIResources.baseUrl + APIResources.payment + APIResources.membership + APIResources.order, inputbody);
  }

  getSessionIdForLateFee(inputbody: any) {
    const headers = this.utilService.setAuthHeader(); 
    console.log(headers);
    return this.http.post(APIResources.baseUrl + APIResources.payment + APIResources.lateFee + APIResources.order, inputbody, {headers});
  }
}
