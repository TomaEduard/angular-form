import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  // FormGroup
  // email = new FormControl('', 
  //   {
  //     validators: [Validators.required, Validators.email],
  //     updateOn: 'blur',
  //   }
  // );

  // password = new FormControl('', 
  //   {
  //     validators: [
  //       Validators.required, 
  //       Validators.minLength(8),
  //       createPasswordStrengthValidator()
  //     ],
  //   }
  // );

  // form = new FormGroup({
  //   email: this.email,
  //   password: this.password
  // });

  form = this.fb.group({
    email: ['', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }],
    password: ['', 
      // validator array
      [
        Validators.required, 
        Validators.minLength(8),
        createPasswordStrengthValidator()
      ]
    ]
  });

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {

  }

  get email() {
    return this.form.controls['email']; 
  }

  get password() {
    return this.form.controls['password']; 
  }

}
