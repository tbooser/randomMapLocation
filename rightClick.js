
var locations = [];

function myLocations(input){

	locations.push(input);	

	function showDiv() {
   		document.getElementById('myLocations').style.display = "block";
	}

}

function alertLocations(){
	
	alert('MyLocations: ' + locations)

}