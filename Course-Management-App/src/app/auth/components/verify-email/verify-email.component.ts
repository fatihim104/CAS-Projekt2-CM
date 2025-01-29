import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  standalone: true,
  imports: [ButtonModule, RouterLink],
})
export class VerifyEmailComponent {
  authService = inject(AuthService);
}
