var map;
var panorama;

function initMap() {
    // Sets random coordinates
  var latCoor = Math.random()*Math.max((180-5*0.25), 120) - (90 - Math.min(4*0.25, 45));
  var longCoor = Math.random() * 360 - 180;
  var location = {lat: latCoor, lng: longCoor};
  
    
  var streetView = new google.maps.StreetViewService();        //The StreetViewService object provides an interface to the data stored in Google's street view service.


  map = new google.maps.Map(document.getElementById('map'), {             //Creates new google map, assigns it to the div 'map'.
    center: location,                                                     //Center refers to the starting location, which 
    zoom: 5,                                                              //is determined by the random coordinates generated above.
    streetViewControl: true
  });
  
    //Makes a separate google map for the panorama with the StreetViewPanorama object and assigns it to the div 'pano'.
  panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
  

    //Provides click functionality to allow user to click anywhere on the map and be redirected to the closest panoramic shot within
    //10,000,000 meters. The event refers to the click event, and latLng refers to that click event's coordinates.
  map.addListener('click', function(event) {
    streetView.getPanorama({location: event.latLng, radius: 10000000}, streetViewData);
  });
}

function streetViewData(data) {
   
    var marker = new google.maps.Marker({                     //Creates a red google maps marker.
      position: data.location.latLng,                         
      map: map,                                               
      title: data.location.description,
      draggable: true
    });
      
    
    google.maps.event.addListener(marker,  'rightclick',  function(rightClickEvent)                   //This is a right click event that adds the marker's coordinates
      { myLocations(data.location.description + "      " + data.location.latLng + "           ") });  //to the locations array, using the myLocations function below.

 
    panorama.setPano(data.location.pano);                        //This uses the setPano() method on the StreetViewPanorama object to set 
    panorama.setPov({                                            //the panorama once one is located within streetView.getPanorama in the initMap function. 
      heading: 0,   
      pitch: 0
    });
    panorama.setVisible(true);
    
}

  

var locations = [];

function myLocations(input){           //Pushes coordinates into the locations array

  locations.push(input);  

}



function alertLocations(){              //Alerts My Locations
  
  alert('MyLocations: ' + locations)

} 
