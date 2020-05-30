import { map, take, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { HomePreview } from 'src/app/models/homePreview';
import { OidcFacade } from 'ng-oidc-client';
import { of } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
isUserAvailable = false;

  constructor(public authService: AuthService,
              private http: HttpClient,
              public oidcSecurityService: OidcSecurityService) {

  }
  homePreview: HomePreview[] = [
    {
      image: 'assets/Home/space1.jpg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
    },
    {
      image: 'assets/Home/space1.jpg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
    },
    {
      image: 'assets/Home/space1.jpg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
    }
  ];
  options: string[] = ['北京', '天津', '上海'];

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe((auth) => {
      console.log('is authenticated', auth);
      console.log('access_token', this.oidcSecurityService.getToken())
      this.isUserAvailable = auth;
    }
    );
  }

  // signinRedirect() {
  //   this.oidcFacade.signinRedirect();
  // }

  // signoutRedirect() {
  //   this.oidcFacade.signoutRedirect();
  // }
  login() {
    this.oidcSecurityService.authorize();
}

logout() {
    this.oidcSecurityService.logoff();
}
}
