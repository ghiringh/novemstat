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
	ctrl.addEvent = function(){
		eventsService.postEvent(ctrl.event).then(function(){
			$state.go('tab.eventList');
		}).catch(function(err){
			throw new Error("Une erreur est survenue lors de l'enregistrement de l'événement");
		});
	};
});

angular.module('novemstat').controller('eventListCtrl', function(eventsService) {
	var ctrl = this;
	eventsService.getEvents().then(function(data) {
		ctrl.events = data;
		console.log(ctrl.events);
	});
});

angular.module('novemstat').controller('eventListElementCtrl', function() {
	var ctrl = this;
});

angular.module('novemstat').controller('eventDetailsCtrl', function(eventsService, $stateParams) {
	var ctrl = this;
});

angular.module('novemstat').component('eventListElement', {
	templateUrl: 'templates/eventListElement.html',
	bindings: {
		event: '<'
	},
	controller: 'eventListElement',
	controllerAs: 'eventListElement'
});