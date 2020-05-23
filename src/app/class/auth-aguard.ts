import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthAguard implements CanActivate{

  constructor(private authService: AuthService, private router:Router){

  }

  canActivate(){
    if(!this.authService.isAuthenticathed()){
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }


}
