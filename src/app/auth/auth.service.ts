import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  constructor(private router:Router,) {}
    Login(uname:String,pword:String){
      if(uname === 'suren' && pword === '1234'){
        return 200;
      }else{
        return 403;
      }
    }

    logout(){
      this.router.navigate(['login'])
    }

}

