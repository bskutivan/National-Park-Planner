// create park map markers

mapMarkers = [];
mapMarkersSplit = [];
mapMarkersTrimmed = [];
mapMarkersNumbers = [];

// final array of the map marker objects
mapMarkersObjectArray = [];




function addMarker(mapMarkersObjectArray, map) {
    
    console.log(mapMarkersObjectArray);

    for (var i = 0; i < mapMarkersObjectArray.length; i++) {
        mapMarkersObjectArray[i].setMap(map);
    }
};


// initialize map
function initMap() {
        
    // set to center of US
    var options = {
        // to change zoom of map adjust this number up or down
        zoom: 4,
        center: {lat:39.8283, lng:-98.5795}    
    }
    var map = new google.maps.Map(document.getElementById('map'), options)
}

// Regenerate Map based on Input info/Parks info
function specifyMap(lat, lng) {
    // center on input address
    var options = {
            zoom: 4,
            center: {lat:lat, lng:lng}    
        }
    var map = new   
        
    google.maps.Map(document.getElementById('map'), options);

    // generate home marker
    var homeMarker = new google.maps.Marker({
        position:{lat:lat, lng:lng},
    });

    // push home array into marker array
    mapMarkersObjectArray.push(homeMarker);

    console.log(map);
    console.log(homeMarker);

    for (var i = 0; i < mapMarkersNumbers.length; i++) {
        trueParkLat = mapMarkersNumbers[i][0];
        trueParkLng = mapMarkersNumbers[i][1];
        //generate latlng variable for marker property
        var markerLatLng = {lat: trueParkLat, lng: trueParkLng};

        var parkMarker = new google.maps.Marker({
            positions:{markerLatLng},
        });
        //push park marker into final marker array
        mapMarkersObjectArray.push(parkMarker);
      
    }
    // take mapMarkers array and feed into addMarker function
    addMarker(mapMarkersObjectArray, map)
}

// feed lat and lng received from below fetch request back in to get isolated state code.
function getStateCode(lat,lng) {
    var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyCoXn_X7KuEAYtlQ8VUpKfHmg0LmjCFqtU";
    
    console.log(apiUrl);
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                stateCode = data.results[0].address_components[4].short_name;
                console.log(stateCode); 
                getParks(stateCode);

            }) 
        }
    })
}

// use captured address in fetch request to get lat and lng of searched address
function centerMap(address) {

    var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCoXn_X7KuEAYtlQ8VUpKfHmg0LmjCFqtU"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                lat = data.results[0].geometry.location.lat;
                lng = data.results[0].geometry.location.lng;
                
                getStateCode(lat,lng);
            });
        } else {
            alert("Error: " + response.statusText);
        }

    });
}

// trim and parse lat and lng from below function to get numbers then run into new map funciton.
function trimLongLat(mapMarkersSplit) {
    for (let i = 0; i < mapMarkersSplit.length; i++) {
        if (!mapMarkersSplit[i][0]) {
            i++
        }
        var parkLat = mapMarkersSplit[i][0];
        var preParkLng = mapMarkersSplit[i][1];

        var parkLng = preParkLng.trim();
        var numParkLng = parseFloat(parkLng);

        var numParkLat = parseFloat(parkLat);

        mapMarkersNumbers.push([numParkLat, numParkLng]);
    }
    specifyMap(lat,lng,mapMarkersNumbers);

}
// split lat and lng from parks response to isolate values.
function splitLongLat(mapMarkers) {
    for (let i = 0; i < mapMarkers.length; i++) {
        var latLng = mapMarkers[i].replace(/long:/, "");
        var latLngWithoutText = latLng.replace(/lat:/, "");
        var split = latLngWithoutText.split(",");

        mapMarkersSplit.push(split);
    };
    trimLongLat(mapMarkersSplit);


}
