// create park map markers

mapMarkers = [];
splitMapMarkers = [];

function splitLongLat(mapMarkers) {
    console.log(mapMarkers);
    for (let i = 0; i < mapMarkers.length; i++) {
        console.log(mapMarkers[i]);
        var split = mapMarkers[i].split(",");
        splitMapMarkers.push(split);
        console.log(splitMapMarkers);
    };


}

function addMarker(mapMarkers) {
    var marker = new google.maps.Marker({
        positions:{lat:[i].lat, lng:[i].long},
        map:map
    })
};


// initialize map
function initMap() {
        
    // set to center of US
    var options = {
        // to change zoom of map adjust this number up or down
        zoom: 4,
        center: {lat:39.8283, lng:-98.5795}    
    }
    var map = new   
    
    google.maps.Map(document.getElementById('map'), options)
}

// take lat and lng values and recenter map
function specifyMap(lat, lng) {
    // center on input address
    var options = {
            zoom: 4,
            center: {lat:lat, lng:lng}    
        }
    var map = new   
        
    google.maps.Map(document.getElementById('map'), options);

    // add marker
    var marker = new google.maps.Marker({
        position:{lat:lat, lng:lng},
        map:map
    });
    
}

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

function centerMap(address) {

    var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCoXn_X7KuEAYtlQ8VUpKfHmg0LmjCFqtU"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;
                
                getStateCode(lat,lng);
                
                specifyMap(lat, lng);
            });
        } else {
            alert("Error: " + response.statusText);
        }

    });
}