function getPosition(callback) {

  var geocoder = new google.mapsGeocoder();

  var postcode = document.getElementById("postcode").value;

  geocoder.geocode({'address': postcode}, function(results, status)
  {
    if (status == google.maps.GeocoderStatus.OK)
    {
      callback({
        latt: results[0].geometry.location.lat(),
        long: results[0].geometry.location.lng()
      });
    }
  });
}

function setup_map(latitude, longitude) {

var _position = {lat: latitude, lng: longitude};

var maker = new google.maps.Maker({
  position: mapOptions.center,
  map: map
});
}

window.onload = function() {

  setup_map(51.50, -0.1277);

  document.getElementById("form").onsubmit = function() {

    getPosition(function(position){

      vat text = document.getElementById("text")
      text.innerHTML = "Maker position: {longitude: "+position.long+ ", latitude:" +position.latt+" }";

      setup_map(position.latt, position.long);
    });
  };
};

