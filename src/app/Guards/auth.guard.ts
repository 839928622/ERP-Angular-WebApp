import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CanAccessRoles } from '../models/canAccessRoles';
import { OidcFacade } from 'ng-oidc-client';
import { take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private oidcFacade: OidcFacade, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.oidcFacade.identity$.pipe(
      take(1),
      switchMap( user => {
        console.log('Auth Guard - Checking if user exists', user);
        console.log('Auth Guard - Checking if user is expired:', user && user.expired);
        if (user && !user.expired) {
          const canAccessRoles: CanAccessRoles = next.data.CanAccessRoles; // 这里会去路由，获取路由里的定义的角色信息 且有类型系统的支持 如果有错误，及时抛出
          if (canAccessRoles.baseRole.length === 0 && canAccessRoles.secondaryRoles.length === 0) {
            return of(true);
          }
          else if (canAccessRoles.baseRole.length > 0 && canAccessRoles.secondaryRoles.length === 0) {
            if (!canAccessRoles.baseRole.every(role => user.profile.role.includes(role))) { // user.profile.role
              return of(false);
            }
            return of(false);

          } else if (canAccessRoles.baseRole.length > 0 && canAccessRoles.secondaryRoles.length > 0) {
            if (!canAccessRoles.baseRole.every(role => user.profile.role.includes(role))) {
              console.log(user.profile.role);
              console.log(canAccessRoles.baseRole.join(','));
              return of(false); // doesn't meet first requirement
            }
            canAccessRoles.secondaryRoles.forEach(
              element => {
                if (user.profile.role.includes(element)) {
                  return of(true);
                } else {
                  return of(false);
                }
              }
            );
          }
          else { // canAccessRoles.baseRole.length === 0 && canAccessRoles.secondaryRoles.length > 0
            canAccessRoles.secondaryRoles.forEach(
              element => {
                if (user.profile.role.includes(element)) {
                  return of(true);
                } else {
                  return of(false);
                }
              }
            );
          }
          // }
          // );
          return of(false);
        } else {
          this.router.navigate(['home']);
          return of(false);
        }
      })
    );

    // if (!this.authService.userAvailable) {
    //   this.router.navigate(['home']); // not login yet ,redirect to homecomponet
    //   return false;
    // }


    return of(false);
  }
}
