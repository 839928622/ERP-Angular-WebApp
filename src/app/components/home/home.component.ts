import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { HomePreview } from 'src/app/models/homePreview';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, private http: HttpClient) {

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

}
