import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, InputTextModule, ButtonModule]
})
export class SignUpComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);


  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit():void {
    this.getForm();
    this.form.reset();
  }

  getForm(){
    this.form = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(8)],
      ],
      password: ['', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(){
    this.authService.signUp(this.f['email'].value, this.f['password'].value, true)
      .then(() => {
        this.router.navigate(['/auth/verify-email-address']);
      });
  }

}
