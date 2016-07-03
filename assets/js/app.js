'use strict';

var tasks = angular.module('tasks', ['ngRoute', 'ui.bootstrap']);

tasks.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/search', {
		templateUrl: '/templates/search.html',
		controller: 'SearchCtrl'
	});
	$routeProvider.when('/pattern', {
		templateUrl: '/templates/pattern.html',
		controller: 'FileCtrl'
	})
	$routeProvider.otherwise({
		redirectTo: '/search'
	});
}]);

tasks.controller('SearchCtrl', ['$scope', '$rootScope', 'SearchService', function($scope, $rootScope, SearchService){
	$scope.result = {};
	$scope.search = function(query){
		SearchService.getResult(query).then(function(response){
			$scope.result = response;
		});
	}
}]);

tasks.controller('FileCtrl', ['$scope', '$rootScope', 'FileService', function($scope, $rootScope, FileService){
	$scope.results = [];
	$scope.inputs = [];
	$scope.patterns = [];
	$scope.mode = {
		value: 0
	};
	FileService.getInputs().then(function(response){
		$scope.inputs = response;
	});
	FileService.getPatterns().then(function(response){
		$scope.patterns = response;
	});
	$scope.process = function(){
		FileService.start($scope.mode.value).then(function(response){
			$scope.results = response;
		})
	}
}]);