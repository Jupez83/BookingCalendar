module.exports = /*@ngInject*/ function($scope, $state, calendarService) {
  $scope.calendar = {};
  $scope.addCalendar = function(data) {
    var calData = {
      title: data.title,
    };

    calendarService.addCalendar(calData).then(function(data) {
      if (data.status === 'OK') {
        $state.go('calendar', {calendarId: data._id});
        $scope.$emit('calendarListChanged', {calendarId: data._id});
      }
    });
  };
};
