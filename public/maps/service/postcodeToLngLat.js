geocoder = new google.maps.Geocoder();

var getLocation = function ( address, callback ) {
  var locObj;

  //for(var i=0; i < locations.length; i++) {
    //var address = locations[i].desiredLocations;

  geocoder.geocode({ address: address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      locObj = results[0].geometry.location;
      lat = locObj.lat();
      long = locObj.lng();
      console.log(user.username, lat, long);
      callback(locObj);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
    console.log( address.desiredLocations);
    return locObj;
  });
};


