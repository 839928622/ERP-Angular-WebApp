import { Tab } from './../models/tab';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CanAccessRoles } from '../models/canAccessRoles';
import { take, switchMap } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserProfile } from '../models/userIdentity';
import { TabGroupService } from '../services/tabgroup.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuth = false;
  user: UserProfile;
  tabList: Tab[];
  constructor(private router: Router,
              private authService: AuthService,
              private oidcSecurityServices: OidcSecurityService,
              private tabService: TabGroupService,
              private alertifyService: AlertifyService) {
    // this.oidcSecurityServices.checkAuth().subscribe((auth) => {
    //   console.log('is authenticated', auth);
    //   console.log('access_token', this.oidcSecurityServices.getToken());
    //   this.isAuth = auth;
    //   if (auth) {
    //     this.oidcSecurityServices.userData$.subscribe(user => {
    //       this.user = user;
    //     });
    //   }
    // }
    // );
    this.user = this.authService.currentUser;
    this.isAuth = this.authService.IsAuthenticated;
    this.tabService.tabListObservable$.subscribe(tabList => {
      this.tabList = tabList;
    });
  }
  verifyTab(tab: Tab) {
    if (this.tabList === undefined) { // first tab
      this.tabList = [tab];
    }
     else {
      const lastAtiveTabIndex = this.tabList.findIndex(x => x.active === true);
      this.tabList[lastAtiveTabIndex].active = false;
      this.tabList.push(tab);
    }
    this.tabService.updateTabList(this.tabList);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(this.tabList);
    if (this.tabList && this.tabList.length >= 20) {
      this.alertifyService.alert('tips', 'you have opened too many tabs');
      return false;
    }


    if (this.isAuth && this.user) {

      const canAccessRoles: CanAccessRoles = next.data.CanAccessRoles; // 这里会去路由，获取路由里的定义的角色信息 且有类型系统的支持 如果有错误，及时抛出
      const tabInfo: Tab = next.data.Tab; // get tab basic info from router
      if (canAccessRoles.baseRole.length === 0 && canAccessRoles.secondaryRoles.length === 0) {
        if ( tabInfo !== undefined) {
          this.verifyTab(tabInfo);
        }
        return true;
      }
      else if (canAccessRoles.baseRole.length > 0 && canAccessRoles.secondaryRoles.length === 0) {
        if (!canAccessRoles.baseRole.every(role => this.user.role.includes(role))) { // user.profile.role
          return false;
        }
        if ( tabInfo !== undefined) {
          this.verifyTab(tabInfo);
        }
        return true;
      } else if (canAccessRoles.baseRole.length > 0 && canAccessRoles.secondaryRoles.length > 0) {
        if (!canAccessRoles.baseRole.every(role => this.user.role.includes(role))) {
          return false; // doesn't meet first requirement
        }
        canAccessRoles.secondaryRoles.forEach(
          element => {
            if (this.user.role.includes(element)) {
              if ( tabInfo !== undefined) {
                this.verifyTab(tabInfo);
              }

              return true;
            } else {
              return false;
            }
          }
        );
      }
      else { // canAccessRoles.baseRole.length === 0 && canAccessRoles.secondaryRoles.length > 0
        canAccessRoles.secondaryRoles.forEach(
          element => {
            if (this.user.role.includes(element)) {
              if ( tabInfo !== undefined) {
                this.verifyTab(tabInfo);
              }
              return true;
            } else {
              return false;
            }
          }
        );
      }
      // }
      // );
      return false;


    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
