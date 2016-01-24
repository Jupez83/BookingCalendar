module.exports = function() {
  return {
    template: '<div id="calendar"></div>',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope:{
      'dayClickHandler':'&',
      'eventClickHandler':'&',
      'calendarEvents':'=events',
    },
    link: function postLink($scope, element, attrs) {
      $scope.$watch('calendarEvents', function() {
        console.log("events changed!", $scope.calendarEvents);
        $('#calendar').fullCalendar('removeEvents');
        $('#calendar').fullCalendar('addEventSource', $scope.calendarEvents);
        $('#calendar').fullCalendar('rerenderEvents');
      });
    },
    controller: function($scope) {

      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month, agendaWeek, agendaDay'
        },
        editable: true,
        eventLimit: false, // allow "more" link when too many events
        dayClick: function(data) {
          $scope.dayClickHandler({data:data});
          $scope.$apply();
        },
        eventClick: function(data) {
          $scope.eventClickHandler({data:data});
          $scope.$apply();
        },
      });
    },
  };
};