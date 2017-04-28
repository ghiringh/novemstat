angular.module('novemstat').factory('joueursService', function($http) {
	var service = {};

	service.getJoueurs = function(){
		return $http({
			method: 'GET',
			url: '/api-proxy' + '/joueurs'
		}).then(function(res) {
			return res.data;
		});
	}

	service.getJoueur = function(id){
		return $http({
			method: 'GET',
			url: '/api-proxy' + '/joueurs/' + id
		}).then(function(res) {
			return res.data;
		});
	}

	service.postJoueur = function(joueur){
		return $http({
			method: 'POST',
			url: '/api-proxy' + '/joueurs',
			data: joueur
		}).then(function(res) {
			return res.data;
		});
	}

	return service;
});

angular.module('novemstat').controller('joueurListCtrl', function(joueursService) {
	var ctrl = this;
	joueursService.getJoueurs().then(function(data) {
		ctrl.joueurs = data;
		console.log(data);
	});
});

angular.module('novemstat').controller('joueurListElementCtrl', function() {
	var ctrl = this;
});

angular.module('novemstat').controller('joueurDetailsCtrl', function(joueursService, $stateParams) {
	var ctrl = this;
});