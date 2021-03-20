(function (){
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.lunchMenu = "";
    $scope.message = "";
    
    $scope.checkTooMuch = function () {
        let lunchArr = (($scope.lunchMenu).split(','));

        if ($scope.lunchMenu === ""){
            $scope.message = "Please enter data first!"
        }
        else if (lunchArr.length <= 3 && lunchArr.length > 0){
            $scope.message = "Enjoy!"
        }
        else{
            $scope.message = "Too much!"
        }
    };

    $scope.sayMessage = function () {
        return $scope.message
    };
}

}) ();