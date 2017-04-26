angular.module('novemstat').factory('eventsService', function($http,apiUrl) {
	var service = {};

	service.getEvents = function(){
		return $http({
			method: 'GET',
			url: apiUrl + '/evenements'
		}).then(function(res) {
			return res.data;
		});
	}

	service.getEvent = function(id){
		return $http({
			method: 'GET',
			url: apiUrl + '/evenements/' + id
		}).then(function(res) {
			return res.data;
		});
	}

	return service;
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