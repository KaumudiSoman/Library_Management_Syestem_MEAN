import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});
  registered: Boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      role: ['']
    })
  }

  register() {
    const formValue = this.registerForm.value;
    
    let inputbody = {
      username: String(formValue.userName),
      email: String(formValue.email),
      password: String(formValue.password),
      role: String(formValue.role)
    }
    this.authService.signup(inputbody).subscribe({
      next: (response: any) => {
        // let token = JSON.parse(JSON.stringify(response.data.token));
        this.registered = true
        // setTimeout(() => {
        //   this.router.navigateByUrl('home');
        // }, 10000);
      },
      error: err => {this.toastrService.error(err.message)}
    })
  }

  goBack() {
    this.router.navigateByUrl('');
  }
}
