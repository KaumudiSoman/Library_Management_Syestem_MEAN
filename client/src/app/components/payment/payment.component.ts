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
  orderId: String = '';

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
        this.orderId = JSON.parse(JSON.stringify(response.order_id));
        console.log(this.sessionId);
        console.log(this.orderId);
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
        `http://localhost:3000/api/payment/status/${this.orderId}`,
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
