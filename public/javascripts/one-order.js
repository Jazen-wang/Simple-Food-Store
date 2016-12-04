angular.module("fs", ['ngResource']).controller('one-order', mainFun);

mainFun.$inject = ['$resource', '$scope', '$window'];

function mainFun($resource, $scope, $window) {

  $scope.orderDetail = {};

  let id = $window.location.pathname;
  $resource(`/api/${id}`).get({}, function(result) {
    console.log(result);
    if (result.state == 200) {
      $scope.orderDetail = result.message;
    } else {
      console.log(result);
    }
  });
}
