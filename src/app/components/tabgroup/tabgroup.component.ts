import { Router, ActivatedRoute } from '@angular/router';
import { TabGroupService } from './../../services/tabgroup.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tab } from 'src/app/models/tab';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabgroup',
  templateUrl: './tabgroup.component.html',
  styleUrls: ['./tabgroup.component.css']
})
export class TabGroupComponent implements OnInit, OnDestroy {
tabList: Tab[];
 tabListSub: Subscription;
  constructor(private tabService: TabGroupService,
              private router: Router,
              private activatedroute: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.tabListSub.unsubscribe();
  }

  ngOnInit(): void {
    this.tabListSub = this.tabService.tabListObservable$.subscribe( list => this.tabList = list );
    console.log(this.tabList);
  }

 closeTabByTabId(tabId: number) {
   this.tabList.splice(tabId, 1);
   if (this.tabList.length === 0) {
     console.log('current activated route.children', this.activatedroute.children);
     console.log('current activated route url', this.activatedroute.url);
     this.router.navigate(['nav']);
   }
   this.tabService.updateTabList(this.tabList);
 }
}
