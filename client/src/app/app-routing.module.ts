import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user-authentication/login/login.component';
import { RegisterComponent } from './components/user-authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { SearchBookComponent } from './components/search-book/search-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { ForgotPasswordComponent } from './components/user-authentication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/user-authentication/verify-email/verify-email.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { AuthGuard } from './_guards/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { ResetPasswordComponent } from './components/user-authentication/reset-password/reset-password.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentFailureComponent } from './components/payment-failure/payment-failure.component';

const routes: Routes = [
  // {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '', component: LandingComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email/:token', component: VerifyEmailComponent},
  {path: 'reset-password/:token', component: ResetPasswordComponent},
  { path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'explore', component: SearchBookComponent},
      {path: 'wishlist', component: WishlistComponent},
      {path: 'bookshelf', component: BookshelfComponent},
      {path: 'book-detail/:id', component: BookDetailComponent},
      {path: 'payment', component: PaymentComponent},
      {path: 'payment-success', component: PaymentSuccessComponent},
      {path: 'payment-failure', component: PaymentFailureComponent},
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
