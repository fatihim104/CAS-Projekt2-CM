import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss'],
    standalone: true,
    imports: [NgIf, ButtonModule, RouterLink]
})
export class VerifyEmailComponent {

  constructor(
    public authService: AuthService
  ) { }

}
