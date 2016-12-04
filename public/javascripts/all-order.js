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

    function re(_id) {
        $window.location.href = "/order/" + _id
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