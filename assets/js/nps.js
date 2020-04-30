var activityEL = document.getElementById("activity")
var activityCardEl = document.getElementById("activityCard");
var state
var npsLon = []
var npsLat = []
var activities
var npsDescription = []
var parkNameEl = document.getElementById("parkName")


specifiedStateCode = state
if (state === CT) {
    state = NY;
}


function getParks (state) {
    var apiURL = "https://developer.nps.gov/api/v1/parks?api_key=VfkmmuuGjuSAkheEeXmvfQS5Q6HchOCAN2SEgZvm&stateCode=" + state
    fetch(apiURL)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(jsonResponse) {
                console.log(jsonResponse);
                npsLon.push('jsonResponse.longitude');
                npsLat.push('jsonResponse.latitude');

                npsDescription.push('jsonResponse.name');
                activities = jsonResponse.activities

                activity.innerHTML = "Here are some fun activities at parks nearby: " + activities;

                var npsName = function () {
                    for (i = 0; i < npsDescription.length; i++) {
                        parkNameEl.appendChild(npsDescription);
                    }
                }
                localStorage.setItem('state', 'activityCardEl')
                npsName();
                activityCardEl.appendChild(activity);
            })
        } else {
            alert("Error: " + response.statusText)
        }
    })
    .catch(function(error) {
        alert("Please enter a valid State")
    })
}

function saveActivity () {
    localStorage.getItem('state', 'activityCardEl');
}

getParks();




