import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    firstValueFrom(this.authService.user$).then(user => {
      if(user) {
        this.router.navigateByUrl('home')
      }
    });
      // if(this.authService.user$) {
      //   console.log(this.authService.user$)
      //   this.router.navigateByUrl('home')
      // }
  }

  goToRegister() {
    this.router.navigateByUrl('register')
  }
}
