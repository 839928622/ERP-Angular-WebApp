import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-signin-oidc',
  templateUrl: './signin-oidc.component.html',
  styleUrls: ['./signin-oidc.component.css']
})
export class SigninOidcComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.authService.userLoaded$.subscribe(userLoaded => {
    //   if (userLoaded)
    //   {
    //     this.router.navigate(['nav']);
    //   }else {
    //     console.log('错误的登录信息'); // 这里可以注入第三方消息组件库来更友好的提示用户登录失败
    //   }
    // });
    // this.authService.handerCallBackAferSignIn();
  }

}
