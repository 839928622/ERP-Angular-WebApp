import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CanAccessRoles } from '../models/canAccessRoles';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.userAvailable) {
      this.router.navigate(['home']); // not login yet ,redirect to homecomponet
      return false;
    }

    // this.authService.getCurrentUser().then(user => {
    const canAccessRoles: CanAccessRoles = next.data.CanAccessRoles; // 这里会去路由，获取路由里的定义的角色信息 且有类型系统的支持 如果有错误，及时抛出
    if (canAccessRoles.baseRole.length === 0 && canAccessRoles.secondaryRoles.length === 0) {
      return true;
    }
    else if (canAccessRoles.baseRole.length > 0 && canAccessRoles.secondaryRoles.length === 0) {
      if (!canAccessRoles.baseRole.every(role => this.authService.currentUser.profile.role.includes(role))) { // user.profile.role
        return false;
      }
      return false;

    } else if (canAccessRoles.baseRole.length > 0 && canAccessRoles.secondaryRoles.length > 0) {
      if (!canAccessRoles.baseRole.every(role => this.authService.currentUser.profile.role.includes(role))) {
        console.log(this.authService.currentUser.profile.role);
        console.log(canAccessRoles.baseRole.join(','));
        return false; // doesn't meet first requirement
      }
      canAccessRoles.secondaryRoles.forEach(
        element => {
          if (this.authService.currentUser.profile.role.includes(element)) {
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
          if (this.authService.currentUser.profile.role.includes(element)) {
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
  }
}
