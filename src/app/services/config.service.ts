import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse}  from '@angular/common/http';
import { Config } from '../beans/config';


@Injectable({
  providedIn: 'root'
})
export class ConfigService implements OnInit {
  configUrl = 'assets/config.json';

  constructor(private http:HttpClient) {

  }
  ngOnInit(){

  }

  getConfig() {
      return this.http.get<Config>(this.configUrl);
  }


}
