import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
  "./home.component.css",
  "../../../../src/assets/css/animate.css",
  "../../../../src/assets/css/magnific-popup.css",
  "../../../../src/assets/css/owl.carousel.css",
  "../../../../src/assets/css/owl.theme.css",
  "../../../../src/assets/css/style.css"
]
})
export class HomeComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

}
