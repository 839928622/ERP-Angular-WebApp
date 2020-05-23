import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-redirect-silent-renew',
  templateUrl: './redirect-silent-renew.component.html',
  styleUrls: ['./redirect-silent-renew.component.css']
})
export class RedirectSilentRenewComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.handerSilentRenewCallBack(); // 这个组件的作用就是在页面上找一个看不见的frame然后刷新网页从而刷新accesstoken
  }

}
