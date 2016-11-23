/**
 *
 * 整个ng应用的名称
 *
 */
let ngApp = 'SimpleFoodStore';

/**
 *
 * 加载应用级别的依赖模块
 *
 */
angular
  .module(ngApp, [
    'ngResource',
    'ui.router',
  ]);

/**
 *
 * 引导ng-app
 *
 */
angular.element(document).ready(function() {
  angular.bootstrap(document, [ngApp]);
});
