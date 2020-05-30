import { SigninOidcComponent } from './oidc/signin-oidc/signin-oidc.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { RedirectSilentRenewComponent } from './oidc/redirect-silent-renew/redirect-silent-renew.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './Guards/auth.guard';



const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'Todo-List',
    canActivate: [AuthGuard],
    component: TodoTableComponent
  },
  {
    path: 'nav',
    canActivate: [AuthGuard],
    component: NavbarComponent,
    data: { CanAccessRoles: { baseRole: ['Erp'], secondaryRoles: [] }}
  },
  {
    path: 'signin-oidc',
    component: SigninOidcComponent
  },
  {
    path: 'redirect-silentrenew',
    component: RedirectSilentRenewComponent
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
