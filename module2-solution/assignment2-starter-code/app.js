(function () {

'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getItems();

    toBuy.removeItem = function (itemIndex) {
        ShoppingListCheckOffService.removeItem(itemIndex)
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtItems = this;

    boughtItems.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
    var listService = this;

    var boughtItems = [];

    var items = [
        {
            name: 'Cookies'
        },
        {
            name: 'Chips'
        },
        {
            name: 'Coke'
        }
    ];

    listService.removeItem = function(itemIndex) {
        boughtItems.push(items.splice(itemIndex, 1)[0])
    }

    listService.getItems = function () {
        return items;
    }
    
    listService.getBoughtItems = function () {
        return boughtItems;
    };
}

})();