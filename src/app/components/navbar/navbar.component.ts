import { NavMenu } from './../../models/NavMenu';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatExpansionModule} from '@angular/material/expansion';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    NavMenulist: NavMenu[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    this.NavMenulist = [
      { name: '订单管理', isOpened: true, subMenuList : [
        {
          name: '销售开单',
          route: 'Todo-List'
        },
        {
          name: '网络订单',
          route: ''
        },
        {
          name: '门店开单',
          route: ''
        }, {
          name: '调拨开单',
          route: ''
        },
        {
          name: '订单查询',
          route: ''
        },
        {
          name: '草稿单查询',
          route: ''
        },
        {
          name: '销售明细',
          route: ''
        },
        {
          name: '订单审核',
          route: ''
        },
        {
          name: '报价开单',
          route: ''
        },
        {
          name: '销售计划',
          route: ''
        },
        {
          name: '生成退单',
          route: ''
        },
        {
          name: '订单结账',
          route: ''
        },
        {
          name: '毛利管理',
          route: ''
        }
      ]

      },
      {
       name: '采购管理', subMenuList: [
         {
            name: '汇总开单',
            route: ''
         },
         {
          name: '采购开单',
          route: ''
         },
         {
          name: '待处理列表',
          route: ''
         },
         {
          name: '品牌库采购',
          route: ''
         },
         {
          name: '采购单查询',
          route: ''
         },
         {
          name: '采购明细',
          route: ''
         },
         {
          name: '供应商',
          route: ''
         },
         {
          name: '采购单打印',
          route: ''
         },
         {
          name: '生成退单',
          route: ''
         },
         {
          name: '供应商直发',
          route: ''
         },
       ]
      },
      {
        name: '仓储物流', subMenuList: [
          {
             name: '分配订单',
             route: ''
          },
          {
           name: '暂停订单',
           route: ''
          },
          {
           name: '订单打印',
           route: ''
          },
          {
           name: '订单归档',
           route: ''
          },
          {
           name: '调拨单打印',
           route: ''
          },
          {
           name: '订单归档(新)',
           route: ''
          },
          {
           name: '路线设置',
           route: ''
          },
          {
           name: '调拨分配',
           route: ''
          },
          {
           name: '仓库权限设置',
           route: ''
          },
          {
           name: '直发单归档',
           route: ''
          },
        ]
       },
       {
         name: '售后服务', subMenuList: [
          {
            name: '售后审核',
            route: ''
          },
          {
            name: '评价管理',
            route: ''
          },
          {
            name: '服务管理',
            route: ''
          },
          {
            name: '服务单撤销',
            route: ''
          },
         ]
       },
      {
       name: '商品管理', subMenuList: [
         {
            name: '商品查询',
            route: ''
         },
         {
          name: '新增商品',
          route: ''
         },
         {
          name: 'Donvv品牌库',
          route: ''
         },
         {
          name: '品牌管理',
          route: ''
         },
         {
          name: '商品分类',
          route: ''
         },
         {
          name: '成本管理',
          route: ''
         }
       ]
      },
      {
        name: '客户管理', subMenuList: [
         {
           name: '客户查询',
           route: ''
         },
         {
           name: '新建客户',
           route: ''
         },
         {
           name: '专柜管理',
           route: ''
         },
         {
           name: '账户余额',
           route: ''
         },
        ]
      },
      {
        name: '财务管理', subMenuList: [
          {
             name: '对账收款',
             route: ''
          },
          {
           name: '应收报表',
           route: ''
          },
          {
           name: '队长付款',
           route: ''
          },
          {
           name: '开票管理',
           route: ''
          },
          {
           name: '收票管理',
           route: ''
          },
          {
           name: '预收预付',
           route: ''
          },
          {
           name: '调拨对账',
           route: ''
          },
          {
           name: '应收报表(销售)',
           route: ''
          },
          {
           name: '销售待审核',
           route: ''
          },
          {
           name: '采购待审核',
           route: ''
          },
          {
            name: '费用管理',
            route: ''
           },
           {
            name: '付款审核',
            route: ''
           },
           {
            name: '财务确认',
            route: ''
           },
           {
            name: '费用科目',
            route: ''
           },
        ]
       },
       {
        name: '报表中心', subMenuList: [
         {
           name: '销售报表',
           route: ''
         },
         {
           name: '绩效考核',
           route: ''
         },
         {
           name: '库存报表',
           route: ''
         },
         {
           name: '采购报表',
           route: ''
         },
        ]
      },
      {
        name: '集团管理', subMenuList: [
         {
           name: '订单管理',
           route: ''
         },
         {
           name: '集团对账',
           route: ''
         },
         {
           name: '集团设置',
           route: ''
         }
        ]
      },
      {
        name: '分销管理', subMenuList: [
          {
             name: '分销设置',
             route: ''
          },
          {
           name: '分配分销商',
           route: ''
          },
          {
           name: '分销单流程',
           route: ''
          },
          {
           name: '分销订单',
           route: ''
          },
          {
           name: '客户收款',
           route: ''
          },
          {
           name: '分销开票',
           route: ''
          },
          {
           name: '分销付款',
           route: ''
          },
          {
           name: '分销收票',
           route: ''
          },
          {
           name: '收款报表',
           route: ''
          },
          {
           name: '付款报表',
           route: ''
          },
          {
            name: '分销对账付款',
            route: ''
           },
           {
            name: '分销对账收款',
            route: ''
           }
        ]
       },
       {
        name: '系统设置', subMenuList: [
         {
           name: '商城设置',
           route: ''
         },
         {
           name: '后台设置',
           route: ''
         },
         {
           name: '仓库管理',
           route: ''
         },
         {
           name: '账号管理',
           route: ''
         },
         {
          name: '消息设置',
          route: ''
        },
        {
          name: '打印设置',
          route: ''
        },
        {
          name: '个人信息',
          route: ''
        },
        {
          name: '接口管理',
          route: ''
        },
        {
          name: '高级设置',
          route: ''
        },
        ]
      },
    ];
  }

}
