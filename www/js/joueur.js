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
									labels: ["Business", "Coding", "Communication", "Management", "Marketing", "Multimedia"],
									datasets: [
										{
											label: "Score",
											backgroundColor: "rgba(61,103,193,0.3)",
											borderColor: "rgba(61,103,193,1)",
											pointBackgroundColor: "rgba(61,103,193,1)",
											pointBorderColor: "#fff",
											pointHoverBackgroundColor: "#fff",
											pointHoverBorderColor: "rgba(61,103,193,1)",
											data: [joueur.score.business,joueur.score.coding,joueur.score.communication,joueur.score.management,joueur.score.marketing,joueur.score.multimedia]
										}
									]
								},
								options: {
									responsive: false,
									legend: {
										display: false
									},tooltips: {
										enabled: false,
										callbacks: {
											label: function(tooltipItem) {
												return tooltipItem.yLabel;
											}
										}
									},
									hover: {
										mode: null
									},
									scale: {
										display : true,
										ticks: {
											beginAtZero: true,
											display:false
										},
										pointLabels:{
											fontSize: 0
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
	});
});

angular.module('novemstat').controller('joueurDetailsCtrl', function(joueursService, eventsService, $stateParams) {
	var ctrl = this;
	joueursService.getJoueur($stateParams.joueurId).then(function(joueur) {
		ctrl.joueur = joueur;
		console.log(joueur);
		joueursService.getScores().then(function(scores){
			eventsService.getEvents().then(function(evenements){
				angular.forEach(scores, function(score){
					if(score.joueur_id == joueur._id){
						joueur.score = score;
						joueur.chart = {
							type: 'radar',
							data: {
								labels: ["Business", "Coding", "Communication", "Management", "Marketing", "Multimedia"],
								datasets: [
									{
										label: "Score",
										backgroundColor: "rgba(61,103,193,0.3)",
										borderColor: "rgba(61,103,193,1)",
										pointBackgroundColor: "rgba(61,103,193,1)",
										pointBorderColor: "#fff",
										pointHoverBackgroundColor: "#fff",
										pointHoverBorderColor: "rgba(61,103,193,1)",
										data: [joueur.score.business,joueur.score.coding,joueur.score.communication,joueur.score.management,joueur.score.marketing,joueur.score.multimedia]
									}
								]
							},
							options: {
								responsive: true,
								legend: {
									display: false
								},tooltips: {
									callbacks: {
										label: function(tooltipItem) {
											return tooltipItem.yLabel;
										}
									}
								},
								scale: {
									ticks: {
										beginAtZero: true
									}
								}
							}
						}
						var place = document.getElementById('chart-joueur');
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
});