import { TabGroupService } from './../../services/tabgroup.service';
import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/models/tab';

@Component({
  selector: 'app-tabgroup',
  templateUrl: './tabgroup.component.html',
  styleUrls: ['./tabgroup.component.css']
})
export class TabGroupComponent implements OnInit {
tabList: Tab[];
  constructor(private tabService: TabGroupService) { }

  ngOnInit(): void {
    this.tabList = this.tabService.tabList;
  }

}
