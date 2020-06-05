import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-signin-oidc',
  templateUrl: './signin-oidc.component.html',
  styleUrls: ['./signin-oidc.component.css']
})
export class SigninOidcComponent implements OnInit {
  countDown = 50000;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  minus() {
       this.countDown -= 1;
       console.log(this.countDown);
       console.log('user auth yet ?', this.authService.IsAuthenticated);
      // this.router.navigate(['nav']);
  }

  dont() {
    this.countDown = this.countDown - 1;
  }

}
