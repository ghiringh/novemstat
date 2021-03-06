angular.module('novemstat').factory('eventsService', function($http) {
	var service = {};

	service.getEvents = function(){
		return $http({
			method: 'GET',
			url: '/api-proxy' + '/evenements'
		}).then(function(res) {
			return res.data;
		});
	}

	service.getEvent = function(id){
		return $http({
			method: 'GET',
			url: '/api-proxy' + '/evenements/' + id
		}).then(function(res) {
			return res.data;
		});
	}

	service.postEvent = function(event){
		return $http({
			method: 'POST',
			url: '/api-proxy' + '/evenements',
			data: event
		}).then(function(res) {
			return res.data;
		});
	}

	return service;
});

angular.module('novemstat').controller('newEventCtrl', function(eventsService, $state, $scope) {
	var ctrl = this;
	ctrl.event = {};
	$scope.currentDate = new Date();
	//$scope.currentDate.setMinutesn($scope.currentDate.getMinutes() + 5);
	ctrl.addEvent = function(){
		eventsService.postEvent(ctrl.event).then(function(err){
			$state.go('tab.eventList');
		}).catch(function(err){
			throw new Error("Une erreur est survenue lors de l'enregistrement de l'événement");
		});
	};
});

angular.module('novemstat').controller('eventListCtrl', function(eventsService, joueursService) {
	var ctrl = this;
	eventsService.getEvents().then(function(events) {
		ctrl.events = events;
		joueursService.getJoueurs().then(function(joueurs){
			angular.forEach(ctrl.events, function(event){
				event.joueurs = [];
				angular.forEach(joueurs, function(joueur){
					if(joueur.evenement_id == event._id){
						event.joueurs.push(joueur);
					}
				})
			})
		});
	});
});

angular.module('novemstat').controller('liveCtrl', function(eventsService, joueursService) {
	var ctrl = this;
	eventsService.getEvents().then(function(events) {
		angular.forEach(events, function(event){
			if(new Date(event.date_debut).getTime() <= Date.now() && new Date(event.date_fin).getTime() >= Date.now()){
				ctrl.event = event;
			}
		});
		if(ctrl.event !== undefined){
			ctrl.event.joueurs = [];
			ctrl.event.score = {"business": 0,"coding": 0,"communication": 0,"management": 0,"marketing": 0,"multimedia": 0};
			joueursService.getJoueurs().then(function(joueurs) {
				joueursService.getScores().then(function(scores){
					angular.forEach(scores, function(score){
						angular.forEach(joueurs, function(joueur){
							if(score.joueur_id == joueur._id && ctrl.event._id == joueur.evenement_id){
								joueur.score = score;
								ctrl.event.joueurs.push(joueur);
								ctrl.event.score.business += score.business;
								ctrl.event.score.coding += score.coding;
								ctrl.event.score.communication += score.communication;
								ctrl.event.score.management += score.management;
								ctrl.event.score.marketing += score.marketing;
								ctrl.event.score.multimedia += score.multimedia;
							}
						});
					});
					event.chart = {
						type: 'radar',
						data: {
							labels: ["Business", "Coding", "Communication", "Management", "Marketing", "Multimedia"],
							datasets: [
								{
									label: "Tes compétences",
									backgroundColor: "rgba(61,103,193,0.3)",
									borderColor: "rgba(61,103,193,1)",
									pointBackgroundColor: "rgba(61,103,193,1)",
									pointBorderColor: "#fff",
									pointHoverBackgroundColor: "#fff",
									pointHoverBorderColor: "rgba(61,103,193,1)",
									data: [ctrl.event.score.business,ctrl.event.score.coding,ctrl.event.score.communication,ctrl.event.score.management,ctrl.event.score.marketing,ctrl.event.score.multimedia]
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
					};
					var position = document.getElementById('chart');
					var radarChart = new Chart(position, event.chart);
				});
			});
		}

		console.log(ctrl.event);
	});
});

angular.module('novemstat').controller('eventDetailsCtrl', function(eventsService, joueursService, $stateParams) {
	var ctrl = this;
	eventsService.getEvent($stateParams.eventId).then(function(event) {
		ctrl.event = event;
		event.joueurs = [];
		event.score = {"business": 0,"coding": 0,"communication": 0,"management": 0,"marketing": 0,"multimedia": 0};
		joueursService.getJoueurs().then(function(joueurs) {
			joueursService.getScores().then(function(scores){
				angular.forEach(scores, function(score){
					angular.forEach(joueurs, function(joueur){
						if(score.joueur_id == joueur._id && ctrl.event._id == joueur.evenement_id){
							joueur.score = score;
							event.joueurs.push(joueur);
							ctrl.event.score.business += score.business;
							ctrl.event.score.coding += score.coding;
							ctrl.event.score.communication += score.communication;
							ctrl.event.score.management += score.management;
							ctrl.event.score.marketing += score.marketing;
							ctrl.event.score.multimedia += score.multimedia;
						}
					});
				});
				event.chart = {
					type: 'radar',
					data: {
						labels: ["Business", "Coding", "Communication", "Management", "Marketing", "Multimedia"],
						datasets: [
							{
								label: "Tes compétences",
								backgroundColor: "rgba(61,103,193,0.3)",
								borderColor: "rgba(61,103,193,1)",
								pointBackgroundColor: "rgba(61,103,193,1)",
								pointBorderColor: "#fff",
								pointHoverBackgroundColor: "#fff",
								pointHoverBorderColor: "rgba(61,103,193,1)",
								data: [ctrl.event.score.business,ctrl.event.score.coding,ctrl.event.score.communication,ctrl.event.score.management,ctrl.event.score.marketing,ctrl.event.score.multimedia]
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
				};
				var position = document.getElementById('chart');
				var radarChart = new Chart(position, event.chart);
			});
		});
	});
});


