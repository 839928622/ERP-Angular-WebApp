import { CompanyListResolver } from './resolvers/companyListResolver';
import { HomeCanActivateGuard } from './Guards/home-can-activate.guard';
import { SigninOidcComponent } from './oidc/signin-oidc/signin-oidc.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { RedirectSilentRenewComponent } from './oidc/redirect-silent-renew/redirect-silent-renew.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './Guards/auth.guard';
import { NewOrderComponent } from './components/navbar/new-order/new-order.component';



const routes: Routes = [
  {
    path: 'home',
    canActivate: [HomeCanActivateGuard],
    component: HomeComponent,
    // outlet: 'unauthorizedRouterOutlet'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'nav',
   // canActivate: [AuthGuard],
    component: NavbarComponent,
   // outlet: 'unauthorizedRouterOutlet',
    data: { CanAccessRoles: { baseRole: ['Erp'], secondaryRoles: [] }},
    children: [
      {
        path: 'Todo-List',
       // canActivate: [AuthGuard],
        component: TodoTableComponent,
       // outlet: 'authorizedRouterOutlet',
        data: {
          CanAccessRoles:
                {
                  baseRole: ['Erp'], secondaryRoles: []
                },
          Tab: {
                  title: '销售开单',
                  routePath: 'Todo-List',
               },
              }
      },
      {
        path: 'newOrder',
       // canActivate: [AuthGuard],
        component: NewOrderComponent,
        resolve: {companyList: CompanyListResolver},
       // outlet: 'authorizedRouterOutlet',
        data: {
          CanAccessRoles:
                {
                  baseRole: ['Erp'], secondaryRoles: []
                },
          Tab: {
                  title: '网络订单',
                  routePath: 'newOrder',
               },
              }
      },
    ]

  },
  {
    path: 'signin-oidc',
    component: SigninOidcComponent,
  },
  {
    path: 'redirect-silentrenew',
    component: RedirectSilentRenewComponent,
  }
  ,
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
