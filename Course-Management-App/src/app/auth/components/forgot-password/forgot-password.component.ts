import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    standalone: true,
    imports: [
        InputTextModule,
        ButtonModule,
        RouterLink,
        ToastModule,
    ],
})
export class ForgotPasswordComponent {
  constructor(
    public authService: AuthService,
    private messageService: MessageService
  ) {}

  forgotPassword(newPassword: string) {
    this.authService
      .forgotPassword(newPassword)
      .then(() => {
        this.messageService.add({
          key: 'tl',
          severity: 'success',
          summary: 'Password reset email sent, check your inbox.',
        });
      })
      .catch((error) => {
        this.messageService.add({
          key: 'tl',
          severity: 'error',
          summary: 'There is an error',
          detail: error,
        });
      });
  }
}
