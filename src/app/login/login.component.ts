import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone:true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  Username="";
  Password="";
  errorMsg="";

  constructor(private auth: AuthService, private router: Router){}

  login(){
    if (this.Username.trim().length === 0) {
      this.errorMsg = "Username is required";
    } else if (this.Password.trim().length === 0) {
      this.errorMsg = "Password is required";
    } else{
      this.errorMsg ="";
      let res = this.auth.Login(this.Username, this.Password);
      if (res === 200) {
        this.router.navigate(['play'])
      }
      if (res === 403) {
        this.errorMsg="Invalid Credentials"
      }
    }
  }
}