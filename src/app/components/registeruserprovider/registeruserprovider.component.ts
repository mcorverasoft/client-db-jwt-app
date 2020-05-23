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
import { AuthService } from '../../services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { Observable, throwError } from 'rxjs';
import { Responlogin } from 'src/app/beans/responlogin';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Signup } from 'src/app/beans/signup';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

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
  selector: 'app-registeruserprovider',
  templateUrl: './registeruserprovider.component.html',
  styleUrls: ['./registeruserprovider.component.css',
  "../../../../src/assets/css/animate.css"]
})

export class RegisteruserproviderComponent implements OnInit {
  public matcher = new MyErrorStateMatcher();
  public signup: Signup;
  public responseLogin: Responlogin;
  public formRegister: FormGroup;

  //icons Fontawesone
  public faFacebook:IconDefinition =faFacebook;
  public faGoogle:IconDefinition =faGoogle;
  public faTwitter:IconDefinition = faTwitter;
  public faGithub:IconDefinition = faGithub;

  constructor(
    private authService: AuthService,
    private configservice: ConfigService,
    private router:Router,
    private location:Location) { }

    ngOnInit(): void {
      this.formRegister = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]),
        lastname: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]),
        email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
        password: new FormControl('', [Validators.required]),
        phone:new FormControl('', [Validators.required]),
      });
      this.responseLogin = {
        authenticated: false,
        created: false,
        error: '',
        token: '',
        tokenType: '',
      };
    }
    public onRegister(formRegister) {
      if (this.formRegister.valid) {
        this.onProgress();
        this.signup = formRegister;
        console.log(this.signup);
        this.authService.registerUser(this.signup).subscribe(
          (data:Responlogin) => {
            this.responseLogin = data;
            if (this.responseLogin.authenticated && this.responseLogin.created) {
              this.authService.setToken(this.responseLogin.token);
              this.location.replaceState('/');
              this.router.navigate(['/profile']);
              this.offProgress();

            }else
            this.offProgress();
          },
          (error:HttpErrorResponse) => {
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
        this.responseLogin.created=false;
        this.responseLogin.error=error.error.message;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          'Backend returned code '+ error.status +', body was: '+error.error.message
        );
        this.responseLogin.created=false;
        this.responseLogin.error=error.error.message;
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
    }

    ngOnDestroy() {

  }

    onProgress() {
      document.getElementById("overlayRegister").style.display = "flex";
    }

    offProgress() {
      document.getElementById("overlayRegister").style.display = "none";
    }

  }
