
angular.module("fs", []);

angular.module("fs").controller('all-foods', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.test = "aaa";
  $scope.itemModel = "";
  $scope.foodItems = [
    {foodName: "青年沉醉鸡翅", foodPrice: 14, url: "/images/logo0.jpg"},
    {foodName: "肉欲六重门", foodPrice: 14, url: "/images/logo1.jpg"},
    {foodName: "德玛西亚肉饼", foodPrice: 14, url: "/images/logo2.jpg"},
    {foodName: "卖萌青年辣排", foodPrice: 14, url: "/images/logo3.jpg"},
  ];
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
