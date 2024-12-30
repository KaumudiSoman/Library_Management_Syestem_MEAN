import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm : FormGroup = new FormGroup({}); 

  constructor(private fb: FormBuilder, private authService: AuthService, private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.initializeForm();
    }
  
    initializeForm() {
      this.resetPasswordForm = this.fb.group ({
        password: ['', [Validators.required, Validators.email]]
      });
    }
  
    resetPassword() {
      const password = String(this.resetPasswordForm.value.password);
      this.authService.resetPassword(password).subscribe({
        next: () => {
          this.router.navigateByUrl('home');
        },
        error: err => {this.toastrService.error(err.message)}
      })
    }
}
