import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tab } from '../models/tab';

@Injectable({
  providedIn: 'root'
})
export class TabGroupService {
  tabList = new Subject<Tab[]>();
  tabListObservable = this.tabList.asObservable(); // 供其他组件订阅
  constructor() { }
  openNewTab(tab: Tab) {
     tab.active = true;
   // first： get priviously tabList/array
   this.tabListObservable.subscribe( lastTabList => {
 if (lastTabList.length > 0) {
   const lastActiveRouteInddex = lastTabList.findIndex(x => x.active === true);
   lastTabList[lastActiveRouteInddex].active = !lastTabList[lastActiveRouteInddex].active;
  
   // second: push newly tab to array
   lastTabList.push(tab);
   this.tabList.next(lastTabList); // 广播
     }
     lastTabList.push(tab);
     const initialTabList:Tab[];
     initialTabList.push(tab);
     this.tabList.next(initialTabList); // 广播
  } );

  }

  closeTab(tabIndex: number)
  {
    this.tabListObservable.subscribe( lastTabList => {
      const lastActiveRouteInddex = lastTabList.findIndex(x => x.active === true);
      lastTabList.slice(tabIndex, 1);
      this.tabList.next(lastTabList); // 广播
       } );
  }
}
