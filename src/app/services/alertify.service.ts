import { Injectable } from '@angular/core';
declare let alertify: any; // alertify keyword
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  alert(title: string, message: string) {
    alertify.alert(title, message, () => {  });
  }
}
