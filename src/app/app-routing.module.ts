import { HomeCanActivateGuard } from './Guards/home-can-activate.guard';
import { SigninOidcComponent } from './oidc/signin-oidc/signin-oidc.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { RedirectSilentRenewComponent } from './oidc/redirect-silent-renew/redirect-silent-renew.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './Guards/auth.guard';



const routes: Routes = [
  {
    path: 'home',
    canActivate: [HomeCanActivateGuard],
    component: HomeComponent,
    // outlet: 'unauthorizedRouterOutlet'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'nav',
    canActivate: [AuthGuard],
    component: NavbarComponent,
   // outlet: 'unauthorizedRouterOutlet',
    data: { CanAccessRoles: { baseRole: ['Erp'], secondaryRoles: [] }},
    children: [
      {
        path: 'Todo-List',
        canActivate: [AuthGuard],
        component: TodoTableComponent,
       // outlet: 'authorizedRouterOutlet',
        data: {
          CanAccessRoles:
                {
                  baseRole: ['Erp'], secondaryRoles: []
                },
          Tab: {
                  title: '待办',
                  routePath: 'Todo-List'
               },
              }
      },
      {
      path: '',
      redirectTo: 'nav',
      pathMatch: 'full',
      }
    ]

  },
  {
    path: 'signin-oidc',
    component: SigninOidcComponent,
   // outlet: 'unauthorizedRouterOutlet'
  },
  {
    path: 'redirect-silentrenew',
    component: RedirectSilentRenewComponent,
   // outlet: 'unauthorizedRouterOutlet'
  }
  ,
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
