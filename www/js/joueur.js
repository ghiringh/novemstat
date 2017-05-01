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

	service.getScores = function(){
		return $http({
			method: 'GET',
			url: '/api-proxy' + '/scores'
		}).then(function(res) {
			return res.data;
		});
	}

	return service;
});

angular.module('novemstat').controller('joueurListCtrl', function(joueursService, eventsService) {
	var ctrl = this;
	joueursService.getJoueurs().then(function(data) {
		ctrl.joueurs = data;
		joueursService.getScores().then(function(scores){
			eventsService.getEvents().then(function(evenements){
				angular.forEach(ctrl.joueurs, function(joueur){
					angular.forEach(scores, function(score){
						if(score.joueur_id == joueur._id){
							joueur.score = score;
							joueur.chart = {
								type: 'radar',
								data: {
									labels: ["Business", "Communication", "Coding", "Management", "Marketing", "Multimedia"],
									datasets: [
										{
											label: "Tes compétences",
											backgroundColor: "rgba(61,103,193,0.3)",
											borderColor: "rgba(61,103,193,1)",
											pointBackgroundColor: "rgba(61,103,193,1)",
											pointBorderColor: "#fff",
											pointHoverBackgroundColor: "#fff",
											pointHoverBorderColor: "rgba(61,103,193,1)",
											data: [Math.random()*90+10, Math.random()*90+10, Math.random()*90+10, Math.random()*90+10, Math.random()*90+10, Math.random()*90+10]
										}
									]
								},
								options: {
									scale: {
										ticks: {
											beginAtZero: true
										}
									}
								}
							}
							var place = document.getElementById(joueur._id);
							var radarChart = new Chart(place, joueur.chart);
						}
					});
					angular.forEach(evenements, function(evenement){
						if(joueur.evenement_id == evenement._id){
							joueur.evenement = evenement;
						}
					});
				});
			});	
		});
		console.log(data);
	});
});

angular.module('novemstat').controller('joueurListElementCtrl', function() {
	var ctrl = this;
});

angular.module('novemstat').controller('joueurDetailsCtrl', function(joueursService, $stateParams) {
	var ctrl = this;
});