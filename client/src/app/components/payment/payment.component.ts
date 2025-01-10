import { Component, OnInit } from '@angular/core';
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

  // loggedInUser: any;

  constructor(private paymentService: PaymentService, private toastrService: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cashfree = Cashfree({
      mode: environment.cashfreeMode,
    });
    // this.loggedInUser = this.authService.getCurrentUser();
  }

  getSessionId() {
    let inputbody= {
      userId: "670b5bec4ac5b882bad2a10b",
      username: "user2",
      email: "user2@gmail.com",
      contactNo: "9819062701",
    }
    console.log(inputbody);
    this.paymentService.getSessionId(inputbody).subscribe({
      next: (response: any) => {
        this.sessionId = JSON.parse(JSON.stringify(response.payment_session_id));
        console.log(this.sessionId);
      },
      error: (error) => {
        this.toastrService.error(error.message);
      }
    });
  }

  // initiatePayment() {
  //   if (!this.cashfree) {
  //     console.error('Cashfree is not initialized');
  //     return;
  //   }

  //   // Example: Simulate a payment initiation
  //   this.cashfree.initialRequest(
  //     {
  //       order_id: 'order_12345',
  //       order_amount: 500,
  //       customer_details: {
  //         customer_name: 'John Doe',
  //         customer_email: 'john.doe@example.com',
  //         customer_phone: '9876543210',
  //       },
  //     },
  //     (response: any) => {
  //       if (response.status === 'OK') {
  //         console.log('Payment successfully initiated', response);
  //       } else {
  //         console.error('Payment initiation failed', response);
  //       }
  //     }
  //   );
  // }

  handlePayment() {
    let checkoutOptions = {
      paymentSessionId: this.sessionId,
      returnUrl:
        "http://localhost:3000/api/payment/status/{order_id}",
    };
    this.cashfree.checkout(checkoutOptions).then(function (result: any) {
      if (result.error) {
        alert(result.error.message);
      }
      if (result.redirect) {
        console.log("Redirection");
      }
    });
  }
}
