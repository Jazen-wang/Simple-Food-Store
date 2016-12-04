angular
    .module("app", ['ngResource'])
    .controller('OrderController', OrderController);

OrderController.$inject = ['$resource', '$scope'];

function OrderController($resource, $scope) {
    var vm = this;
    vm.OrderList;
    $scope.user = null;

    retrieveUserId();

    function retrieveUserId() {
      $resource(`/api/getCurrentUser`).get({}, function (result) {
        console.log(result);
        if (result.state == 200) {
          $scope.user = result.message;
          getOrderList();
        } else {
          $window.alert("请先登录");
        }
      });
    }

    function getOrderList() {
      if (!$scope.user) return;
      let queryData = {
        userid: $scope.user._id
      }
      $resource('/api/order').get(queryData, function (result) {
          console.log(result.message)
          if (result.state == 200) {
            vm.OrderList = result.message;
            for (let item of vm.OrderList) {
              let date = new Date(item.create_time);
              item.convert_create_time = date.toLocaleString();

            }
          }
      });
    }

    function re(_id) {
        $window.location.href = "/order/" + _id
    }

}
