angular.module("fs", ['ngResource']);

angular.module('fs').controller("login-register", loginRegister);
loginRegister.$inject = ['$scope', '$resource', '$window'];

function loginRegister ($scope, $resource, $window) {
  $scope.form = {username: null, password: null};

  $scope.loginOneUser = function (event) {
    var queryData = {
      username: $scope.form.username,
      password: $scope.form.password
    }
    $resource(`/login`).save(queryData, function (result) {
      if (result.state == 200) {
        success();
      } else {
        console.log(result);
        $window.alert('error');
      }

    });

    function success() {
      $window.location.href = "/all-foods";
    }
  }
}
