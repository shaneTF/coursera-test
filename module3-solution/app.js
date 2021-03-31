(function () {

'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
    var ddo = {
        restrict: 'E',
        templateUrl: 'foundItems.html',
        scope: {
            foundItems: '<',
            onRemove: '&'
        },
        controller: MenuItemsDirectiveController,
        controllerAs: 'menu',
        bindToController: true
    };

    return ddo;
}

function MenuItemsDirectiveController() {
    var menu = this;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var narrowDown = this;

    narrowDown.searchTerm = '';

    narrowDown.getItems = function() {
        var promise = MenuSearchService.getMatchedMenuItems(narrowDown.searchTerm.toLowerCase());

        promise.then(function(response) {
            narrowDown.foundItems = response;
        });
    };

    narrowDown.removeItem = function(index) {
        narrowDown.foundItems.splice(index, 1);
    }
}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
    var service = this;


    service.getMatchedMenuItems = function(searchTerm) {

        return $http({
            method: 'GET',
            url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
        }).then(function(response) {
            var foundItems = [];

            for (var i = 0; i < response.data['menu_items'].length; i++) {
                if(response.data['menu_items'][i]['description'].toLowerCase().indexOf(searchTerm) !== -1 && searchTerm !== ''){
                    foundItems.push(response.data['menu_items'][i])
                }
            }
            return foundItems;
        });
    };
}


})();