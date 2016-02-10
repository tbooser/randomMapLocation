var map;
var panorama;

function initStreetMap() {
  // Sets random coordinates
  var latCoor = Math.random()*Math.max((180-5*0.25), 120) - (90 - Math.min(4*0.25, 45));
  var longCoor = Math.random() * 360 - 180;

  var location = {lat: latCoor, lng: longCoor};
  var streetView = new google.maps.StreetViewService();

  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 5,
    streetViewControl: true
  });
  
  panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
  
  map.addListener('click', function(event) {
    streetView.getPanorama({location: event.latLng, radius: 10000000}, streetViewData);
  });
}

function streetViewData(data) {
    
    var marker = new google.maps.Marker({
      position: data.location.latLng,
      map: map,
      title: data.location.description,
      draggable: true
    });

    google.maps.event.addListener(marker,  'rightclick',  function(rightClickEvent) { myLocations(data.location.description + "      " + data.location.latLng + "           ") });

    marker.addListener('click', function() {
      var markerPanoID = data.location.pano;
      panorama.setPano(markerPanoID);
      panorama.setPov({
        heading: 270,
        pitch: 0
      });
      panorama.setVisible(true);
    });

    panorama.setPano(data.location.pano);
    panorama.setPov({
      heading: 0,
      pitch: 0
    });
    panorama.setVisible(true);
    
}