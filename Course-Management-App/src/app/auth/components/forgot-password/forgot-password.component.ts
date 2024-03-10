import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
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
