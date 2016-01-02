geocoder = new google.maps.Geocoder();

window.getLocation = function ( address, callback ) {
  var locations;
  geocoder.geocode({ address: address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
        locObj = results[0].geometry.location;
        lat = locObj.lat();
        long = locObj.lng();
        console.log(locObj, lat, long);
        //locations = [locObj];
        callback(locObj);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
});
};
