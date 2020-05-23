import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule} from './app.material.module.ts.module';
import { LoginProvidersComponent } from './components/login-providers/login-providers.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarbottomComponent } from './components/navbarbottom/navbarbottom.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule } from '@angular/router';
import { RegisteruserComponent } from './components/registeruser/registeruser.component';
import { RegisteruserproviderComponent } from './components/registeruserprovider/registeruserprovider.component';
import { AuthAguard } from './class/auth-aguard';

const routes=[
    {path:"", component:HomeComponent},
    {path:"profile", component:ProfileComponent, canActivate: [AuthAguard]},
    {path:"signin", component:LoginProvidersComponent},
    {path:"signup", component:RegisteruserComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginProvidersComponent,
    NavbarComponent,
    HomeComponent,
    NavbarbottomComponent,
    ProfileComponent,
    RegisteruserComponent,
    RegisteruserproviderComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,

    BrowserAnimationsModule,
    AppMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    [RouterModule.forRoot(routes)]
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
