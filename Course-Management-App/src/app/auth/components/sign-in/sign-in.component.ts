import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule]
})
export class SignInComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);


  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit():void {
    this.getForm();
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
    this.authService.signIn(this.f['email'].value, this.f['password'].value).then(() => {
      this.router.navigate(['/courses'])
    }).catch((error) => {
      this.messageService.add({
        key: 'tl',
        severity: 'error',
        summary: 'There is an error',
        detail: error.message,
      });
    });

  }


}
