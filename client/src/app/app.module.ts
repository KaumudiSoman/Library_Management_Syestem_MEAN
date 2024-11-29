import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { CommonModule } from '@angular/common';
// import { environment } from 'src/environments/environment';
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';

import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/user-authentication/login/login.component';
import { RegisterComponent } from './components/user-authentication/register/register.component';
import { VerifyEmailComponent } from './components/user-authentication/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/user-authentication/forgot-password/forgot-password.component';

import { SearchBookComponent } from './components/search-book/search-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

import { WishlistComponent } from './components/wishlist/wishlist.component';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { LandingComponent } from './components/landing/landing.component'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    HomeComponent,
    // SearchBookComponent,
    BookDetailComponent,
    // VerifyEmailComponent,
    // ForgotPasswordComponent,
    WishlistComponent,
    BookshelfComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
