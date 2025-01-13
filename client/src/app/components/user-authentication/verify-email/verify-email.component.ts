import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private toastrService: ToastrService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    console.log(token)
    if (token) {
        this.verifyEmail(token);
    }
  }

  verifyEmail(token: string) {
    this.authService.verifyEmail(token).subscribe({
      next: (response: any) => {
        setTimeout(() => {
          this.router.navigateByUrl('payment');
      }, 5000);
      },
      error: (err) => {
        this.toastrService.error(err.message.message)
      }
    })
  }
}
