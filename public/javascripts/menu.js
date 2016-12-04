
angular.module("fs", ['ngResource']);

angular.module("fs").controller('menu', ['$scope', '$timeout', '$resource', '$window', function($scope, $timeout, $resource, $window) {
  $scope.test = "aaa";
  $scope.itemModel = "";
  $scope.showMask = false;
  $scope.user = {};
  $scope.orderAddresss;
  $scope.orderPhone;
  $scope.orderUsername;

  retrieveFood();
  retrieveUserId();

  $scope.makeOrder = (event) => {
    $scope.orderTotalPrice = 0;
    for (let item of $scope.foodItems) {
      if (item.orderNumbers != 0) {
        $scope.orderTotalPrice += item.price * item.orderNumbers;
        $scope.showMask = true;
      }
    }
  };

  $scope.cancelOrder = (event) => {
    $scope.showMask = false;
  };

  $scope.changeOneFood = (event, id, flag) => {
    for (let item of $scope.foodItems) {
      if (item._id == id) {
        if (flag == 'sub' && item.orderNumbers > 0) item.orderNumbers--;
        if (flag == 'add') item.orderNumbers++;
        item.orderPrices = item.orderNumbers * item.foodPrice;
      }

    }
    event.stopPropagation();

  };
  $scope.submitClicked = (event) => {
    postOrder();
  };
  $scope.login = (event) => {
    $window.location.href="/login";
  };
  $scope.logout = (event) => {
    let queryData = {}
    $resource(`/logout`).save(queryData, function (result) {
      if (result.state == 200)
        $window.location.href="/login";
      else {
        console.log("logout errror");
      }
    });
  };
  $scope.showDetailMask = (event) => {
    // $resource
  };

  function retrieveFood() {
    $resource(`/api/food`).get({}, function (result) {
      if (result.state == 200) {
        success(result);
      } else {
        console.log(result);
      }
    });
    function success(result) {
      $scope.foodItems = result.message;
      for (let item of $scope.foodItems) {
        item.orderNumbers = 0;
        item.orderPrices = 0;
      }
    }
  }

  function retrieveUserId() {
    $resource(`/api/getCurrentUser`).get({}, function (result) {
      if (result.state == 200) {
        $scope.user = result.message;
      } else {
        $window.alert("请先登录");
      }
    });
  }

  function postOrder() {

    if ($scope.orderUsername == null) {
      $window.alert("请填写客户名");
      return;
    }
    if ($scope.orderPhone == null) {
      $window.alert("请填写手机");
      return;
    }
    if ($scope.orderAddresss == null) {
      $window.alert("请填写地址");
      return;
    }
    let _foodids = [];
    for (let i = 0; i < $scope.foodItems.length; i++) {
      if ($scope.foodItems[i].orderNumbers > 0)
        _foodids.push({foodid: $scope.foodItems[i]._id, num: $scope.foodItems[i].orderNumbers})
    }
    let queryData = {
      userid: $scope.user._id,
      username: $scope.orderUsername,
      phonenumber: $scope.orderPhone,
      foodids: _foodids,
      create_time: new Date(),
      address: $scope.orderAddresss
    }
    $resource(`/api/order`).save(queryData, function (result) {
      if (result.state == 200) {
        success(result);
      } else {
        $window.alert('提交订单发生错误');
      }
    });
    function success() {
      $window.alert('成功下单');
    }
  }

}]);

angular.module('fs').filter('fsSearch', function() {
  return function(item, search) {
    if (item == null || item.length == 0) return;
    var expected = ('' + search).toLowerCase();
    var result = [];
    item.forEach(function (item_) {
      var actual = ('' + item_).toLowerCase();
      if (actual.indexOf(expected) !== -1) {
        result.push(item_);
      }
    });
    return result;
  }
});

angular.module('fs').filter('numbersFilter', function() {
  return function(item) {
    if (item == null || item.length == 0) return;
    var result = [];
    item.forEach(function (item_) {
      if (item_.orderNumbers > 0) result.push(item_);
    });
    return result;
  }
});
