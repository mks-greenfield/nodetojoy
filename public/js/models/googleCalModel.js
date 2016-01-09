angular.module('dibs.googlecal', [])
.factory('googleCalModel', function($http) {

  var postToGoogleCal = function(event) {

    return $http({
      method: 'POST',
      url: '/api/events/googlecal',
      data: { event: event }
    });
  };

  return {
    postToGoogleCal : postToGoogleCal
  };
});