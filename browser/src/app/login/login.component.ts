import {Component, OnInit} from '@angular/core';
import {Facebook} from './facebook'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  facebook: any;
  loggedIn: boolean = false;
  name: string = "";

  constructor() { }

  ngOnInit() {
    this.facebook = new Facebook('2083203935234055')

    this.facebook.response.subscribe(response => {
      if (response.status == "connected") {
        this.loggedIn = true;
        this.name = response.authResponse.name;
      }
    });
  }

  login() {
    this.facebook.login();
  }
}
