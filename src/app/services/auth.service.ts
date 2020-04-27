import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { from, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {
    this.userManager.clearStaleState(); //  用户上次访问idp获取到的凭证（存储在浏览器本地），有可能过期了，清除一下
    this.userManager.getUser().then(user => {
      if (user){

        this.currentUser = user; // 如果用户已经登录，则把user赋值给currentUser
        this.userLoaded$.next(true); // 发布一个事件给订阅者，true表示用户已经登录了
      }else{ // 用户没有登录
        this.currentUser = null;
        this.userLoaded$.next(false); // 告诉订阅者，用户没有登录
      }
    }).catch(error => {
      this.currentUser = null;
      this.userLoaded$.next(false); // 发生错误了，用户肯定没有登录
    });

    // 用户刚刚登录触发的事件
    this.userManager.events.addUserLoaded(user => {
      this.currentUser = user;
      this.userLoaded$.next(true); // 事件 用户刚登录
      console.log('用户登录:' + user);
    });

    // 用户刚刚登出触发的事件
    this.userManager.events.addUserUnloaded( () => {
     this.currentUser = null;
     this.userLoaded$.next(false);
     console.log('用户登出');
    });
   }
  private userManager = new UserManager(environment.openIdConnectSettings);
  private currentUser: User;

  get userAvailable(): boolean
  {
     return !! this.currentUser; // 当前用户==null? false:true
  }

  get user(): User {
    return this.currentUser;
  }
  userLoaded$ = new ReplaySubject<boolean>(1); // userLoaded中的美元符号表示observable ReplaySubject是一个可订阅和可发布的对象，当有新的订阅的时候可以重复上一次的发布

  triggerSignIn() {
    this.userManager.signinRedirect().then(() => {
      console.log('triggerSignIn');
    });
  }

  handerCallBackAferSignIn() { // 登录之后的回调
    this.userManager.signinRedirectCallback().then(user => {
      this.currentUser  = user;
      console.log('用户登录之后的回调');
    });
  }

  handerSilentRenewCallBack() { // 静默刷新access_token的回调
    this.userManager.signinSilentCallback().then(user => {
      this.currentUser  = user;
      console.log('静默刷新access_token');
    });
  }

  triggerSignOut() {
    this.userManager.signoutRedirect().then(response => {
      this.router.navigate(['/home']);
      console.log('用户登出：' + response);
    });
  }
}
