import { environment } from './../../environments/environment';
import { BranchSettings } from './../models/branchSettings';
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
public data: BranchSettings;
public connectionId: string;
private hubConnection: signalR.HubConnection;
public startConnection = () => {
  this.hubConnection = new signalR.HubConnectionBuilder()
                           .withUrl(environment.erpApiBase + '/AdvancedSetting', {
                            skipNegotiation: true,
                            transport: signalR.HttpTransportType.WebSockets})
                           .build();

  this.hubConnection
  .start()
  .then(() => {
    console.log('开启signal-r连接');
    this.hubConnection.invoke('getConnectionId') // call AdvancedSettingHub's function "GetConnectionId",since we're in js/ts environment,
                                                // fitst character need to be lowwer case
    .then( (connectionId) => {
     this.connectionId = connectionId; // assign connectionId(from api) to connectionId(local)
    });
  })
  .catch(error => console.log('signal-r连接错误！提示:' + error));
}



  constructor() { }

  ActivateBranchSettingsDataListener(branchId: string) {
    console.log('branchId:' + branchId);
    this.hubConnection.on('branchSettings-' + branchId, (data) => { // listening on branchSettings
      console.log('signal-r从服务端取得：', data);
    });
  }
}
