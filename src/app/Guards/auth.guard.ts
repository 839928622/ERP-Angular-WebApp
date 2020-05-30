import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CanAccessRoles } from '../models/canAccessRoles';
import { OidcFacade } from 'ng-oidc-client';
import { take, switchMap } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserProfile } from '../models/userIdentity';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuth = false;
  user: UserProfile;
  constructor( private router: Router, private authService: AuthService, private oidcSecurityServices: OidcSecurityService) {
    this.oidcSecurityServices.checkAuth().subscribe((auth) => {
      console.log('is authenticated', auth);
      console.log('access_token', this.oidcSecurityServices.getToken());
      this.isAuth = auth;
      if (auth) {
        this.oidcSecurityServices.userData$.subscribe(user => {
          this.user = user;
        });
      }
    }
    );
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // this.oidcFacade.identity$.pipe(
    //   take(1), switchMap( user => {
    //     console.log('Auth Guard - Checking if user exists', user);
    //     console.log('Auth Guard - Checking if user is expired:', user && user.expired);
    //     if (user && !user.expired) {
    //       const canAccessRoles: CanAccessRoles = next.data.CanAccessRoles; // 这里会去路由，获取路由里的定义的角色信息 且有类型系统的支持 如果有错误，及时抛出
    //       if (canAccessRoles.baseRole.length === 0 && canAccessRoles.secondaryRoles.length === 0) {
    //         return of(true);
    //       }
    //       else if (canAccessRoles.baseRole.length > 0 && canAccessRoles.secondaryRoles.length === 0) {
    //         if (!canAccessRoles.baseRole.every(role => user.profile.role.includes(role))) { // user.profile.role
    //           return of(false);
    //         }
    //         return of(false);
    //       } else if (canAccessRoles.baseRole.length > 0 && canAccessRoles.secondaryRoles.length > 0) {
    //         if (!canAccessRoles.baseRole.every(role => user.profile.role.includes(role))) {
    //           console.log(user.profile.role);
    //           console.log(canAccessRoles.baseRole.join(','));
    //           return of(false); // doesn't meet first requirement
    //         }
    //         canAccessRoles.secondaryRoles.forEach(
    //           element => {
    //             if (user.profile.role.includes(element)) {
    //               return of(true);
    //             } else {
    //               return of(false);
    //             }
    //           }
    //         );
    //       }
    //       else { // canAccessRoles.baseRole.length === 0 && canAccessRoles.secondaryRoles.length > 0
    //         canAccessRoles.secondaryRoles.forEach(
    //           element => {
    //             if (user.profile.role.includes(element)) {
    //               return of(true);
    //             } else {
    //               return of(false);
    //             }
    //           }
    //         );
    //       }
    //       // }
    //       // );
    //       return of(false);
    //     } else {
    //       this.router.navigate(['home']);
    //       return of(false);
    //     }
    //   })
    // );

    // // if (!this.authService.userAvailable) {
    // //   this.router.navigate(['home']); // not login yet ,redirect to homecomponet
    // //   return false;
    // // }

    // return of(false);
    if (this.isAuth && this.user) {

            const canAccessRoles: CanAccessRoles = next.data.CanAccessRoles; // 这里会去路由，获取路由里的定义的角色信息 且有类型系统的支持 如果有错误，及时抛出
            if (canAccessRoles.baseRole.length === 0 && canAccessRoles.secondaryRoles.length === 0) {
            return true;
          }
          else if (canAccessRoles.baseRole.length > 0 && canAccessRoles.secondaryRoles.length === 0) {
            if (!canAccessRoles.baseRole.every(role => this.user.role.includes(role))) { // user.profile.role
              return false;
            }
            return true;
          } else if (canAccessRoles.baseRole.length > 0 && canAccessRoles.secondaryRoles.length > 0) {
            if (!canAccessRoles.baseRole.every(role => this.user.role.includes(role))) {
              return false; // doesn't meet first requirement
            }
            canAccessRoles.secondaryRoles.forEach(
              element => {
                if (this.user.role.includes(element)) {
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


        }else{
          this.router.navigate(['home']);
          return false;
        }}
      }
