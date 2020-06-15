import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-oidc',
  templateUrl: './signin-oidc.component.html',
  styleUrls: ['./signin-oidc.component.css']
})
export class SigninOidcComponent implements OnInit {
  countDown = 5;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {


    const interval = setInterval(() => {

      this.countDown = this.countDown - 1;
      if (this.countDown <= 0) {
        clearInterval(interval);
        console.log('sign-in oidc,is Auth', this.authService.IsAuthenticated);
        this.router.navigate(['nav']);
      }
    }, 500);

  }






}
