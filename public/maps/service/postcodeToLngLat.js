angular.module('postcodeConv', []).factory('postcodeConv', [function() {

return {
  getLocation: function (user) {
    geocoder = new google.maps.Geocoder();
    var locObj;
    var that = this;

    var address = user.desiredLocation;

    geocoder.geocode({ address: address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        locObj = results[0].geometry.location;
        lat = locObj.lat();
        long = locObj.lng();
        console.log(user.username, lat, long);
        that.desiredLocationPoints = [lat, long];
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    return that.desiredLocationPoints;
  }
};

}]);
