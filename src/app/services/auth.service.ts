import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable} from 'rxjs/internal/Observable';
import { Login } from '../beans/login';
import { ConfigService } from './config.service';
import { Config } from '../beans/config';
import { Responlogin } from '../beans/responlogin';
import { Signup } from '../beans/signup';
import { isNullOrUndefined } from 'util';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private token:string;
  private config:Config={backendUrl:'',backendUrlLogin:'', backendUrlSignup:'', textfile:''};


  constructor(private http:HttpClient, private configService:ConfigService) {

    this.configService.getConfig().subscribe((data) => {this.config = {...data}} );
  }

  ngOnInit(){

  }


  headers:HttpHeaders = new HttpHeaders({
    "Content-Type":"application/json"
      });

  loginApp(login:Login):Observable<Responlogin>{
         return this.http
         .post<Responlogin>(this.config.backendUrlLogin, login, {headers:this.headers})

  }

  registerUser(signup:Signup):Observable<Responlogin>{
    return this.http
    .post<Responlogin>(this.config.backendUrlSignup, signup, {headers:this.headers})
  }

  isAuthenticathed():boolean{
    let token:string =localStorage.getItem("token");
    if(!isNullOrUndefined(token)){
      if(token.length>0)
        return  true;
      else
        return false;
    }else
      return false;
  }

  getToken():string{
    return localStorage.getItem("token");
  }

  logout():void{
    localStorage.removeItem("token");
  }

  setToken(token:string):void{
    localStorage.setItem("token", token);
  }

 }
