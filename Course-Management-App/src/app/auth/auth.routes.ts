import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';


export const authRoutes: Routes = [
  {
    path: '',
    component: SignInComponent,
    children: [
      { path: 'auth/sign-in', component: SignInComponent },
      { path: 'auth/register-user', component: SignUpComponent },
      { path: 'auth/forgot-password', component: ForgotPasswordComponent },
      { path: 'auth/verify-email-address', component: VerifyEmailComponent },
    ],
  },
];