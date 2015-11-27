/**
 * Created by colinjlacy on 11/27/15.
 */
angular.module('recordsapp', ['ui.router'])

	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('list', {
				url: '/',
				templateUrl: 'app/views/list.template.html',
				controller: 'MainController',
				cache: false
			})
			.state('item', {
				url: '/:id',
				templateUrl: 'app/views/item.template.html',
				controller: 'MainController',
				cache: false
			});
		$urlRouterProvider.otherwise('list');
	})
	.controller('MainController', function($scope, $http, $state, $stateParams) {

		$scope.fetchAll = function() {
			$http(
				{
					method: "GET",
					url: "/api/"
				}
			).then(function(res) {
					$scope.items = res.data;
				}, function(err) {
					console.log(JSON.stringify(err));
				});
		};

		if($stateParams.id) {
			$http(
				{
					method: "GET",
					url: "/api/" + $stateParams.id
				}
			).then(function(res) {
					console.log(res);
					$scope.inputForm = res.data[0];
				}, function(err) {
					console.log(JSON.stringify(err));
				});
		} else {
			$scope.fetchAll();
		}

		$scope.delete = function(id, index) {
			$http(
				{
					method: "POST",
					url: "/api/" + id
				}
			).then(function() {
					$scope.items.splice(index, 1);
				}, function(err) {
					console.log(JSON.stringify(err));
				});
		};

		$scope.save = function(firstname, lastname, email) {
			$http(
				{
					method: "POST",
					url: "/api/",
					data: {
						firstname: firstname,
						lastname: lastname,
						email: email,
						document_id: $stateParams.id
					}
				}
			).then(function() {
					$state.go("list");
				}, function(err) {
					console.log(JSON.stringify(err));
				});
		};
	});