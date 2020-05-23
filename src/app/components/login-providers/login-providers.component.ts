import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle, faTwitter, faGithub, IconDefinition  } from '@fortawesome/free-brands-svg-icons';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Login } from '../../beans/login';
import { Config } from '../../beans/config';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { Observable, throwError } from 'rxjs';
import { Responlogin } from 'src/app/beans/responlogin';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && isSubmitted);
  }
}

@Component({
  selector: 'app-login-providers',
  templateUrl: './login-providers.component.html',
  styleUrls: ['./login-providers.component.css',
  "../../../../src/assets/css/animate.css"]
})
export class LoginProvidersComponent implements OnInit {
  public matcher = new MyErrorStateMatcher();
  public login: Login;
  public responseLogin: Responlogin;
  public formLogin: FormGroup;
  public config: Config;

  //icons Fontawesone
  public faFacebook:IconDefinition =faFacebook;
  public faGoogle:IconDefinition =faGoogle;
  public faTwitter:IconDefinition = faTwitter;
  public faGithub:IconDefinition = faGithub;
  constructor(
    private authService: AuthService,
    private configservice: ConfigService,
    private router:Router,
    private location:Location
  ) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      usernameOrEmail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.responseLogin = {
      authenticated: false,
      created: false,
      error: '',
      token: '',
      tokenType: '',
    };
  }


  public onLogin(loginForm) {
    if (this.formLogin.valid) {
      this.onProgress();
      this.login = loginForm;
      this.authService.loginApp(this.login).subscribe(

        (data) => {
          this.responseLogin = data;
          if (this.responseLogin.authenticated) {
            this.authService.setToken(this.responseLogin.token);
            this.location.replaceState('/');
            this.router.navigate(['/profile']);
          }
          this.offProgress();
          console.log('ResponseLogin', this.responseLogin);
        },
        (error) => {
                    this.handleError(error);
                    this.offProgress();
                  }
      );
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  ngOnDestroy() {

}

  onProgress() {
    document.getElementById("overlay").style.display = "flex";
  }

  offProgress() {
    document.getElementById("overlay").style.display = "none";
  }

}
