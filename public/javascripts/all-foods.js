
angular.module("fs", ['ngResource']);

angular.module("fs").controller('all-foods', ['$scope', '$timeout', '$resource', function($scope, $timeout, $resource) {
  $scope.test = "aaa";
  $scope.itemModel = "";
  $scope.foodItems = [
    {id:'1', foodName: "青年沉醉鸡翅", foodPrice: 14, url: "/images/logo0.jpg", orderNumbers: 0, orderPrices: 0 },
    {id:'2', foodName: "肉欲六重门", foodPrice: 14, url: "/images/logo1.jpg", orderNumbers: 0, orderPrices: 0 },
    {id:'3', foodName: "德玛西亚肉饼", foodPrice: 14, url: "/images/logo2.jpg", orderNumbers: 0, orderPrices: 0 },
    {id:'4', foodName: "卖萌青年辣排", foodPrice: 14, url: "/images/logo3.jpg", orderNumbers: 0, orderPrices: 0 },
    {id:'5', foodName: "青年沉醉鸡翅", foodPrice: 14, url: "/images/logo0.jpg", orderNumbers: 0, orderPrices: 0 },
    {id:'6', foodName: "肉欲六重门", foodPrice: 14, url: "/images/logo1.jpg", orderNumbers: 0, orderPrices: 0 },
    {id:'7', foodName: "德玛西亚肉饼", foodPrice: 14, url: "/images/logo2.jpg", orderNumbers: 0, orderPrices: 0 },
    {id:'8', foodName: "卖萌青年辣排", foodPrice: 14, url: "/images/logo3.jpg", orderNumbers: 0, orderPrices: 0 },
    {id:'9', foodName: "青年沉醉鸡翅", foodPrice: 14, url: "/images/logo0.jpg", orderNumbers: 0, orderPrices: 0 },
    {id:'10', foodName: "肉欲六重门", foodPrice: 14, url: "/images/logo1.jpg", orderNumbers: 0, orderPrices: 0 },
    {id:'11', foodName: "德玛西亚肉饼", foodPrice: 14, url: "/images/logo2.jpg", orderNumbers: 0, orderPrices: 0 },
    {id:'12', foodName: "卖萌青年辣排", foodPrice: 14, url: "/images/logo3.jpg", orderNumbers: 0, orderPrices: 0 }


  ];

  $scope.changeOneFood = (event, id, flag) => {
    for (let item of $scope.foodItems) {
      if (item.id == id) {
        if (flag == 'sub' && item.orderNumbers > 0) item.orderNumbers--;
        if (flag == 'add') item.orderNumbers++;
        item.orderPrices = item.orderNumbers * item.foodPrice;
      }

    }
  };

}]);

angular.module('fs').filter('fsSearch', function() {
  return function(item, search) {
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
    var result = [];
    item.forEach(function (item_) {
      if (item_.orderNumbers > 0) result.push(item_);
    });
    return result;
  }
});
