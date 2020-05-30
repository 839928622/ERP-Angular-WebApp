import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { from, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import * as Oidc from 'oidc-client';
import { UserIdentity } from '../models/userIdentity';
import { AlertifyService } from './alertify.service';
import { ThrowStmt } from '@angular/compiler';
import { OidcFacade } from 'ng-oidc-client';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: UserIdentity;
  constructor(private router: Router, private alertifyService: AlertifyService, private oidcFacade: OidcFacade ) {
    // Oidc.Log.logger = console;
    // this.userManager.clearStaleState(); //  用户上次访问idp获取到的凭证（存储在浏览器本地），有可能过期了，清除一下
    // this.userManager.getUser().then(user => {
    //   if (user){

    //     this.currentUser = user; // 如果用户已经登录，则把user赋值给currentUser
    //     this.userLoaded$.next(true); // 发布一个事件给订阅者，true表示用户已经登录了
    //   }else{ // 用户没有登录
    //     this.currentUser = null;
    //     this.userLoaded$.next(false); // 告诉订阅者，用户没有登录
    //   }
    // }).catch(error => {
    //   this.currentUser = null;
    //   this.userLoaded$.next(false); // 发生错误了，用户肯定没有登录
    // });

    // // 用户刚刚登录触发的事件
    // this.userManager.events.addUserLoaded(user => {
    //   console.log('用户刚刚登录' + user);
    //   this.currentUser = user;
    //   this.userLoaded$.next(true); // 事件 用户刚登录
    // });

    // // 用户刚刚登出触发的事件
    // this.userManager.events.addUserUnloaded( () => {
    //  this.currentUser = null;
    //  this.userLoaded$.next(false);
    //  console.log('用户刚刚登出');
    // });
    const userIdentity = localStorage.getItem('oidc.user:' + environment.openIdConnectSettings.authority +
    ':' + environment.openIdConnectSettings.client_id);
    this.user = JSON.parse(userIdentity);
   }
  // private userManager = new UserManager(environment.openIdConnectSettings);
  // public  currentUser: User;
  // get user(): User {
  //   return this.currentUser;
  // }
  // get userAvailable(): boolean
  // {
  //    return !! this.currentUser; // 当前用户==null? false:true
  // }

  // userLoaded$ = new ReplaySubject<boolean>(1); // userLoaded中的美元符号表示observable ReplaySubject是一个可订阅和可发布的对象，当有新的订阅的时候可以重复上一次的发布
  // getCurrentUser(): Promise<User> {
  //   return this.userManager.getUser();
  // }
  // triggerSignIn() {
  //   this.userManager.signinRedirect().then(() => {
  //     console.log('触发登录');
  //   });
  // }

  // handerCallBackAferSignIn() { // 登录之后的回调
  //   this.userManager.signinRedirectCallback().then(user => {
  //     this.currentUser  = user;
  //     console.log('用户登录之后的回调，并把用户信息赋值' + user);
  //   });
  // }

  // handerSilentRenewCallBack() { // 静默刷新access_token的回调
  //   this.userManager.signinSilentCallback().then( user => {
  //     this.currentUser  = user;
  //     console.log('静默刷新access_token' + user);
  //   });
  // }

  // triggerSignOut() {
  //   this.userManager.signoutRedirect().then(response => {
  //     console.log('用户触发登出：' + response);
  //     this.router.navigate(['home']);
  //   });
  // }

  get isExpired(): boolean {
    if (this.user){
      return this.user.expires_at > new Date().getTime();
    }
    return true;
  }

  triggerSignin() {
    this.oidcFacade.signinRedirect();
  }

  triggerSignout() {
    this.oidcFacade.signoutRedirect();
  }
}
