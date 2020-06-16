import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from './services/signal-r.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ERP-Angular-WebApp';
  constructor(public authService: AuthService,
              private signalRService: SignalRService,
              private httpClient: HttpClient) {

  }
  ngOnInit(): void {

  }
}
