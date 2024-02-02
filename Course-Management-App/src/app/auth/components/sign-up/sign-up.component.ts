import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private authService:AuthService){}

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
    this.authService.signUp(this.f['email'].value, this.f['email'].value);
  }

}
