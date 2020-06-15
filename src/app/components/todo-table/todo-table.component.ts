import { TodoService } from './../../services/todo.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TodoTableDataSource, TodoTableItem } from './todo-table-datasource';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css']
})
export class TodoTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TodoTableItem>;
  dataSource: TodoTableDataSource;
 toDoList: Todo[];
 constructor(private todoService: TodoService) {
 }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new TodoTableDataSource();
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
    this.todoService.getAllToDo().subscribe(todo => {
      this.toDoList = todo;
      console.log(this.toDoList);
    });
  }
}
