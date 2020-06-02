import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tab } from '../models/tab';

@Injectable({
  providedIn: 'root'
})
export class TabGroupService {
  tabList: Tab[];
  constructor() { }
  openNewTab(tab: Tab) {
    const lastActiveRouteInddex = this.tabList.findIndex(x => x.active === true);
    this.tabList[lastActiveRouteInddex].active = !this.tabList[lastActiveRouteInddex].active;
    tab.active = true;
    this.tabList.push(tab);
  }

  closeTab(tabIndex: number)
  {
    this.tabList.slice(tabIndex, 1);
  }
}
