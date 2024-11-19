import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { User } from './_models/BookDataModels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  setCurrentUser() {
    const userStr: string | null = localStorage.getItem('loggedInUser');
    if(!userStr) {
      this.authService.setCurrentUser(null);
      return;
    }

    const user: User = JSON.parse(userStr);
    this.authService.setCurrentUser(user);
  }
}
