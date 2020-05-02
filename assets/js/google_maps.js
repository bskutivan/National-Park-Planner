// create park map markers

mapMarkers = [];
mapMarkersSplit = [];
mapMarkersTrimmed = [];
mapMarkersTest = [];
// let lat
// let lng



// function addMarker(mapMarkersTest) {
    
//     console.log(mapMarkersTest);

  
// };


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

// Regenerate Map based on Input/Parks
function specifyMap(lat, lng, mapMarkersTest) {
    // center on input address
    var options = {
        zoom: 4,
        center: {lat:lat, lng:lng}    
    }
    var map = new google.maps.Map(document.getElementById('map'), options);
    // add marker

    var marker = new google.maps.Marker({
        positions:{lat: lat, lng: lng},
        map:map
    });
    console.log(map);
    console.log(marker);
    marker.setMap(map);

    // change variable to string and push to marker array
    // testLat = lat
    // testLng = lng
    // mapMarkersTest.push([testLat, testLng]);
    
    // for (var i = 0; i < mapMarkersTest.length; i++) {
    //     trueParkLat = mapMarkersTest[i][0];
    //     trueParkLng = mapMarkersTest[i][1];
    //     var markerLatLng = {lat: trueParkLat, lng: trueParkLng};

    //     // var marker = new google.maps.Marker({
    //     //     positions:{markerLatLng},
    //     // });
    //     // marker.setMap(map);
    // }
    // console.log(mapMarkersTest);
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
                lat = data.results[0].geometry.location.lat;
                lng = data.results[0].geometry.location.lng;
                
                getStateCode(lat,lng);
            });
        } else {
            alert("Error: " + response.statusText);
        }

    });
}

function trimLongLat(mapMarkersSplit) {
    for (let i = 0; i < mapMarkersSplit.length; i++) {
        if (!mapMarkersSplit[i][0]) {
            i++
        }
        var parkLat = mapMarkersSplit[i][0];
        var preParkLng = mapMarkersSplit[i][1];

        var parkLng = preParkLng.trim();

        mapMarkersTest.push([parkLat, parkLng]);
    }
    specifyMap(lat,lng,mapMarkersTest);

}

function splitLongLat(mapMarkers) {
    for (let i = 0; i < mapMarkers.length; i++) {
        var latLng = mapMarkers[i].replace(/long:/, "");
        var latLngWithoutText = latLng.replace(/lat:/, "");
        var split = latLngWithoutText.split(",");

        mapMarkersSplit.push(split);
    };
    trimLongLat(mapMarkersSplit);


}
