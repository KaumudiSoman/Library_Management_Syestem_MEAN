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

  constructor(private router: Router, private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSource.next(user);
    }
  }

  private currentUserSource = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  );
  user$ = this.currentUserSource.asObservable();

  currentUser: User = {} as User;

  signup(body: any) {
    return this.http.post(APIResources.baseUrl + APIResources.users + APIResources.signup, body).pipe(
      map((response: any) => {
        if(response) {
          console.log(response);
          this.currentUser = response.user;
          this.currentUserSource.next(this.currentUser);
          localStorage.setItem('loggedInUser', JSON.stringify(response.data.newUser));
          localStorage.setItem('authToken', JSON.stringify(response.token));
        }
      })
    );
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
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
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

  updateMembershipStatus(isMember: boolean): void {
    const currentUser = this.currentUserSource.value;
    if (currentUser) {
      const updatedUser = { ...currentUser, isMember };
      // this.currentUserSource.next(updatedUser);
      this.setCurrentUser(updatedUser)
    }
  }

  verifyEmail(token: string) {
    return this.http.get(APIResources.baseUrl + APIResources.users + APIResources.verification + `/${token}`);
  }

  forgotPassword(email: String) {
    return this.http.post(APIResources.baseUrl + APIResources.users + APIResources.forgotPassword, {email: email});
  }

  resetPassword(password: String, token: String) {
    return this.http.post(APIResources.baseUrl + APIResources.users + APIResources.resetPassword + `/${token}`, {password: password});
  }
}
