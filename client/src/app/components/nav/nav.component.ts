import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/BookDataModels';
import { AuthService } from 'src/app/_services/auth.service';
import { UtilService } from 'src/app/_services/util.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  loggedInUser: User = {} as User;

  constructor(public authService: AuthService, private router: Router, private toastrService: ToastrService) {
    this.loggedInUser = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('login');
      },
      error: err => {this.toastrService.error(err.message)}
    })
    // console.log('hello');
  }

  isLandingPage() {
    return this.router.url === '/';
  }
}
