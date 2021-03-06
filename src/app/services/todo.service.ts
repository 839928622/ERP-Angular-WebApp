import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl: string = environment.erpApiBase;
  constructor(private httpClient: HttpClient) { }
  getAllToDo(): Observable<Todo[]>{
   return this.httpClient.get<Todo[]>(this.apiUrl + '/Todo/GetToDoList');
  }
}
