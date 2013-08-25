function getLocation()
{
	try{
		
			$.get("http://ipinfo.io", function(response) {
						var userPos=new google.maps.LatLng(response.loc.split(',')[0],response.loc.split(',')[1]);
						localStorage.setItem('userPosition',JSON.stringify(userPos));
						console.log(localStorage.userPosition);
			}, "jsonp");
		}
	catch(b){
		alert('Error in getLocation ' + b);
	}
} 

//Could pass in a categoryID to this function
//Need to add an extra column to the location table : distance/duration/travelMode (i.e. walking or driving)
//Give the user the option of changing the travel mode
//Could have a refresh button on this list also...
//so when this gets run (when the list opens) it saves the distance into the table
//
function getDistance(){
	try{
		//getLocation();	//loads the userPosition into localStorage
		var directionsService = new google.maps.DirectionsService();
		
		var userPos=JSON.parse(localStorage.getItem('userPosition'));
		
		var originPosition=new google.maps.LatLng(userPos.mb,userPos.nb);
		
		var destinationPosition=new google.maps.LatLng(53.287,-6.36647);
		var request={
			origin:originPosition,
			destination:destinationPosition,
			travelMode:google.maps.DirectionsTravelMode.DRIVING
		}
		
		directionsService.route(request, function(response, status) {
			console.log('route response ' + google.maps.DirectionsStatus);
			if (status == google.maps.DirectionsStatus.OK) {
				//directionsDisplay.setDirections(response);
				console.log('=>Distance okay.');
				console.log('=>Distance is ' + response.routes[0].legs[0].distance.text);
				console.log('=>Duration is ' + response.routes[0].legs[0].duration.text);
				//Call some (new) function here that updates the in browser sqlite database with this distance
				//Course if the user moves, the need to hit refresh to get new distances
				//Could have another function that clears out these distances each time the list closes
				//This ensures the distance data is up to date...
			}
			else
			{
				console.log('Something up..');
			}
		});
	}
	catch(b){
		console.log('Error in getDistance' +b);
	}
}