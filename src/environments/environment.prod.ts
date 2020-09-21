export const idpBase = 'http://www.erp.com/idp'; // 授权服务端点
export const erpApiBase = 'http://localhost:5000'; // ERP的API
export const angularErpBase = 'http://www.erp.com'; // 本spa的地址

export const environment = {
  production: true,
  erpApiBase, // 和上方的一样就不需要写类型
  openIdConnectSettings: {
    authority: idpBase,
    client_id: 'ERP-Angular-WebApp',
    redirect_uri: angularErpBase + '/signin-oidc', // 登陆成功后跳转该Url
    post_logout_redirect_uri: angularErpBase, // 登出后 跳转到该url
    silent_redirect_uri: angularErpBase + '/redirect-silentrenew', // 静默刷新access_token后跳转到该uri
    scope: 'ERP-API profile phone role email openid', // 可以访问的资源
    response_type: 'code', // id_token表示有用户信息的token token表示access_token
    automaticSilentRenew: true, // 是否自动刷新access_token
    userStore: localStorage,
    canAccessUserInfo: true
  }
};
