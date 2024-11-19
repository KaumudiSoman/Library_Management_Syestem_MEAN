import { inject, Injectable, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import { User } from '../_models/BookDataModels';
import { APIResources } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  private currentUserSource = new BehaviorSubject<User | null>(null);
  user$ = this.currentUserSource.asObservable();

  currentUser: User = {} as User;

  signup(body: any) {
    return this.http.post(APIResources.baseUrl + APIResources.users + APIResources.signup, body);
  }

  login(body: any) {
    return this.http.post(APIResources.baseUrl + APIResources.users + APIResources.login, body).pipe(
      map((response: any) => {
        if(response) {
          console.log(response);
          this.currentUser = response.user;
          this.currentUserSource.next(this.currentUser);
          localStorage.setItem('loggedInUser', JSON.stringify(response.user));
          localStorage.setItem('authToken', JSON.stringify(response.token));
        }
      })
    )
  }

  logout() {
    this.setCurrentUser(null);
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('authToken');
    return this.http.get(APIResources.baseUrl + APIResources.users + APIResources.logout)
  }

  setCurrentUser(user: User | null) {
    this.currentUserSource.next(user);
  }

  getCurrentUser() {
    this.currentUserSource.subscribe(user => {
      if(user) {
        this.currentUser = user
      }
    })
    console.log('account service, get current user : ', this.currentUser)
    return this.currentUser;
  }
}
