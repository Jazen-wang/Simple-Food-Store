
/**
 *
 * angular config: matrix应用层的配置
 *
 */
angular.module('SimpleFoodStore').config(
  ['$resourceProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
  function($resourceProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

    // 配置location服务
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: true,
      rewriteLinks: true
    });

    // 默认路径，如果访问路径不存在，引导到错误页面
    $urlRouterProvider.otherwise('login-register');

    // 应用层ui-router页面路由配置
    $stateProvider
      .state('login-register', {
        url: '/login-register',
        templateUrl: '/app-angular/self/views/login-register.client.view.html'
      });
  }]
);
