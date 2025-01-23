import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, InputTextModule, NgIf, ButtonModule, ToastModule]
})
export class SignInComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private messageService: MessageService){}

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
