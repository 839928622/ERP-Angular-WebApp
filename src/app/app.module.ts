import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import { SigninOidcComponent } from './oidc/signin-oidc/signin-oidc.component';
import { RedirectSilentRenewComponent } from './oidc/redirect-silent-renew/redirect-silent-renew.component';
import { HomeComponent } from './components/home/home.component';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './Guards/auth.guard';
import { AuthorizationHeaderInterceptor } from './interceptor/authorization-header.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { NgOidcClientModule } from 'ng-oidc-client';
import { WebStorageStateStore, Log } from 'oidc-client';
import { environment } from './../environments/environment';
import { StoreModule, ActionReducerMap,  } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
export interface State {
  router: RouterReducerState;
}
export const rootStore: ActionReducerMap<State> = {
  router: routerReducer
};
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TodoTableComponent,
    SigninOidcComponent,
    RedirectSilentRenewComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatMenuModule,
    MatDividerModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatBadgeModule,
    MatTabsModule,
    MatCardModule,
    StoreModule.forRoot(rootStore, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'ng-oidc-client',
      logOnly: true
    }),
    NgOidcClientModule.forRoot({
           oidc_config: {
             authority: environment.openIdConnectSettings.authority,
             client_id: environment.openIdConnectSettings.client_id,
             redirect_uri: 'http://localhost:4200/callback.html',
             response_type: environment.openIdConnectSettings.response_type,
             scope: environment.openIdConnectSettings.scope,
             post_logout_redirect_uri: 'http://localhost:4200/signout-callback.html',
             silent_redirect_uri: 'http://localhost:4200/renew-callback.html',
             accessTokenExpiringNotificationTime: 10,
             automaticSilentRenew: true,
             userStore: new WebStorageStateStore({ store: window.localStorage })
           },
           log: {
             logger: console,
             level: Log.NONE
           }
        }),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
