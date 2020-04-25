import { SigninOidcComponent } from './oidc/signin-oidc/signin-oidc.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { RedirectSilentRenewComponent } from './oidc/redirect-silent-renew/redirect-silent-renew.component';


const routes: Routes = [
  {
    path: 'Todo-List',
    component: TodoTableComponent
  },
  {
    path: 'nav',
    component: NavbarComponent
  },
  {
    path: 'signin-oidc',
    component: SigninOidcComponent
  },
  {
    path: 'redirect-silentrenew',
    component: RedirectSilentRenewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
