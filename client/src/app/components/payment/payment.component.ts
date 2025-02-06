import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/BookDataModels';
import { AuthService } from 'src/app/_services/auth.service';
import { PaymentService } from 'src/app/_services/payment.service';
import { environment } from 'src/environments/environment';

declare var Cashfree: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cashfree: any;
  version: any;
  sessionId: String = '';
  orderId: String = '';

  loggedInUser: any;

  durationForm: FormGroup = new FormGroup({});

  constructor(private paymentService: PaymentService, private toastrService: ToastrService, private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.cashfree = Cashfree({
      mode: environment.cashfreeMode,
    });
    this.loggedInUser = this.authService.getCurrentUser();
  }

  initializeForm() {
    this.durationForm = this.fb.group({
      duration: [''],
    });
  }

  getSessionId() {
    const formValue = this.durationForm.value;
    let inputbody= {
      userId: this.loggedInUser._id,
      duration: Number(formValue.duration)
    }
    console.log(inputbody);

    this.paymentService.getSessionIdForMembership(inputbody).subscribe({
      next: (response: any) => {
        this.sessionId = JSON.parse(JSON.stringify(response.payment_session_id));
        this.orderId = JSON.parse(JSON.stringify(response.order_id));
        this.handlePayment();
      },
      error: (error) => {
        this.toastrService.error(error.message);
      }
    });
  }

  handlePayment() {
    let checkoutOptions = {
      paymentSessionId: this.sessionId,
      returnUrl:
        `http://localhost:3000/api/payment/membership/status/${this.orderId}`,
    };
    this.cashfree.checkout(checkoutOptions).then( (result: any) => {
      if (result.error) {
        alert(result.error.message);
      }
      if (result.redirect) {
        console.log("Redirection");
      }
    });
  }
}
