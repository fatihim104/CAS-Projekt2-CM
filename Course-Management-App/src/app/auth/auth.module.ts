import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ToastModule } from 'primeng/toast';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component:SignInComponent },
      { path: 'auth/sign-in', component: SignInComponent },
      { path: 'auth/register-user', component: SignUpComponent },
      { path: 'auth/forgot-password', component: ForgotPasswordComponent },
      { path: 'auth/verify-email-address', component: VerifyEmailComponent },
    ],
  },
];

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class AuthModule {}
