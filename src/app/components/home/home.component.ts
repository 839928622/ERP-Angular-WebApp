import { map, take, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { HomePreview } from 'src/app/models/homePreview';
import { OidcFacade } from 'ng-oidc-client';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
isUserAvailable = false;

  constructor(public authService: AuthService, private http: HttpClient, private oidcFacade: OidcFacade) {
    if (this.oidcFacade.waitForAuthenticationLoaded())
    {
      this.oidcFacade.getOidcUser();
    }
    this.oidcFacade.identity$.pipe(
      take(1),
      switchMap( user => {
        console.log(user);
        if (user && !user.expired && user.access_token) {
        this.isUserAvailable = true;
        return of(true);
        }
      }));
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
  }

  signinRedirect() {
    this.oidcFacade.signinRedirect();
  }

  signoutRedirect() {
    this.oidcFacade.signoutRedirect();
  }
}
