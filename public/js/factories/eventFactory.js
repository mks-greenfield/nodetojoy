angular.module('eventsInfoFactory', [])
  .factory('Eventstored', function($http) {
    //posts events to database
    var eventData = function(dibEvent) {
      return $http({
        method: 'POST',
        url: '/api/events/booked',
        data: {
          dibEvent: dibEvent
        }
      }).then(function(responseObj) {
        getData();
        return responseObj;
      });
    };

    //retrieves events
    var getData = function() {
      return $http({
        method: 'GET',
        url: '/api/events/events'
      });
    };

    var getAllData = function() {
      return $http({
        method: 'GET',
        url: '/api/events/allevents'
      });
    };

    var formatData = function(events) {
      var eventsCollection = events.data,
        eventDates,
        formattedDate,
        eventTimes;
      console.log("FORMAT DATA IN EVENTFACTORY.JS", events);

      eventsCollection.forEach(function(event) {
        eventDates = event.eventDate;
        eventEndDates = event.eventEndDate;
        formattedDate = moment(eventDates).format("dddd, MMMM Do YYYY");
        formattedTime = moment(eventDates).format('h:mmA');
        event.eventDate = formattedDate;
        event.eventEndDate = moment(eventEndDates).format("dddd, MMMM Do YYYY");
        event.eventTime = formattedTime;
        event.eventEndTime = moment(eventEndDates).format('h:mmA');
      });

      return eventsCollection;
    };

    var formatAllData = function(events) {
      var eventsCollection = events.data,
        eventDates,
        formattedDate,
        eventTimes,
        tasks = [];
      // console.log("FORMATALLDATA IN EVENTFACTORY.JS", events);
      // console.log("TEST");
      eventsCollection.forEach(function(event) {
        var task = {
          startDate: null,
          endDate: null,
          taskName: null,
          status: null
        };
        console.log(event);
        startDate = event.eventDate;
        endDate = event.eventEndDate;
        formattedDate = moment(startDate).format("ddd MMM D");
        formattedTime = moment(startDate).format('H:mm:ss YYYY');
        event.eventDate = formattedDate;
        event.eventEndDate = moment(endDate).format("ddd MMM D");
        event.eventTime = formattedTime;
        event.eventEndTime = moment(endDate).format('H:mm:ss YYYY');
        task.startDate = event.eventDate + " " + event.eventTime;
        task.endDate = event.eventEndDate + " " + event.eventEndTime;
        task.taskName = event.roomName;
        task.status = event.user;
        tasks.push(task);
      });

      return tasks;
    };

    return {
      eventData: eventData,
      getData: getData,
      formatData: formatData,
      getAllData: getAllData,
      formatAllData: formatAllData
    };
  });