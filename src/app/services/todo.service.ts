import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }
  getAllToDo(): Observable<Todo[]>{
   return this.httpClient.get<Todo[]>('http://localhost:5000/Todo/GetToDoList');
  }
}
