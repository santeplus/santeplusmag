'use strict';

/**
 * @ngdoc function
 * @name santeplusApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the santeplusApp
 */
angular.module('santeplusApp')
.controller('ContactCtrl', function ($scope, $http) {
	$scope.send = function($event) {
		console.log("message envoyé.");
		$event.preventDefault();
		$http({
            method: 'POST',
            url: 'http://www.santeplusmag.com/contact/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: {
                "username" : $scope.username, 
                "usermail" : $scope.usermail, 
                "subject" : $scope.subject, 
                "message" : $scope.message,
                "g-recaptcha-response": "ok",
                "submit" : "success"
            },
            transformRequest: function (data, headersGetter) {
                return $.param(data);
            }
        })
        .success(function (data) {
        	if(data[0] == "success")
        	{
        		$scope.success = true;
        		$scope.username = ""; 
                $scope.usermail = ""; 
                $scope.subject = ""; 
                $scope.message = "";
                $scope.contact.$setPristine();
        	}
        })
        .error(function (data, status) {

        });
	}
});
