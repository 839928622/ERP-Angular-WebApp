

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.



export const idpBase = 'http://localhost:6566'; // 授权服务端点
export const erpApiBase = 'http://localhost:5000'; // ERP的API
export const angularErpBase = 'http://localhost:4200'; // 本spa的地址
export const environment = {
  production: false,
  erpApiBase, // 和上方的一样就不需要写类型
  openIdConnectSettings: {
    authority: idpBase,
    client_id: 'ERP-Angular-WebApp',
    redirect_uri: angularErpBase + '/signin-oidc', // 登陆成功后跳转该Url
    post_logout_redirect_uri: angularErpBase + '/home', // 登出后 跳转到该url
    silent_redirect_uri: angularErpBase + '/renew-callback.html', // 静默刷新access_token后跳转到该uri
    scope: 'ERP-API profile phone role email openid branchId', // 可以访问的资源
    response_type: 'code', // id_token表示有用户信息的token token表示access_token id_token token
    userStore: localStorage,
    automaticSilentRenew: true, // 是否自动刷新access_token
    canAccessUserInfo: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
