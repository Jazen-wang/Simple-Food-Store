angular
    .module("app", [])
    .controller('OrderController', OrderController);

function OrderController() {
    var vm = this;
    vm.OrderList = 
    [
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
    ];
}