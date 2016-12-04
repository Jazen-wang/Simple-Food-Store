angular
    .module("app", ['ngResource'])
    .controller('OrderController', OrderController);

OrderController.$inject = ['$resource'];

function OrderController($resource) {
    var vm = this;
    vm.OrderList;

    getOrderList();

    function getOrderList() {
        $resource('/api/order').get({}, function (result) {
            console.log(result.message)
            vm.OrderList = result.message;
        });
    }

    function retrieveFood() {
        $resource(`/api/food`).get({}, function (result) {
          if (result.state == 200) {
            success(result);
          } else {
            console.log(result);
          }
        });
        function success(result) {
          vm.foodItems = result.message;
          for (let item of vm.foodItems) {
            item.orderNumbers = 0;
            item.orderPrices = 0;
          }
        }
    }
    
}



/*[
        {
            foodname:"shit",
            price:100,
            count:5
        }, 
        {
            foodname:"bigshit",
            price:200,
            count:1
        }, 
    ];*/