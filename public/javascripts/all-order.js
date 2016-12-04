angular
    .module("app", ['ngResource', 'ngRoute'])
    .controller('OrderController', OrderController);

OrderController.$inject = ['$resource'];

function OrderController($resource) {
    var vm = this;
    vm.OrderList = getOrderList();

    function getOrderList() {
        
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