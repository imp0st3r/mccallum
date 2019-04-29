import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formError: String;

  constructor(
    private fb:FormBuilder,
    private as:AuthenticationService,
    private router: Router,
  ) {
    this.createForm();
  }
  createForm(){
    this.loginForm = this.fb.group({
      email: new FormControl({value:'',disabled:false}),
      password: new FormControl({value:'', disabled:false})
    })
  }

  ngOnInit() {
    if(this.as.isLoggedIn()){
      this.router.navigate(['/dashboard']);
    }
  }

  login(){
    this.formError = null;
    let loginCreds = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    if(loginCreds.email){
      if(loginCreds.password){
        this.as.login(loginCreds).subscribe((result: any) => {
            //console.log(result);
            this.as.saveToken(result.token);
            this.router.navigate(['/dashboard']);
        },(error: any) => {
          this.formError = error.error.message;
        })
      }else{
        this.formError = "Please enter your password";
      }
    }else{
      this.formError = "Please enter your email address.";
    }
  }
}
