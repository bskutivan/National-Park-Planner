const api_key = 'VfkmmuuGjuSAkheEeXmvfQS5Q6HchOCAN2SEgZvm'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';
var stateCode = specifiedStateCode

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    mapMarkers.push(responseJson.data[i].latLong);
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName} - Location: ${responseJson.data[i].states}</h3>
      <p>Address: ${responseJson.data[i].latLong}</p>
      <p>Description: ${responseJson.data[i].description}</p>
      <p>Activities: ${responseJson.data[i].activities}</p>
      <p>URL: <a href="${responseJson.data[i].url}"</a>${responseJson.data[i].url}</p>
      </li>`
    )}; 
  $('#results').removeClass('hidden');
};

function getParks(stateCode, limit=10) {
  const params = {
    stateCode,
    api_key,
    limit,
    start:0
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .then(responseJson => addMarker(responseJson))
    .catch(err => {
      $('#error-message').text(`Something went wrong: ${err.message}`);
    });
}

// Handlers and Event Listeners Below

function submitButtonHandler() {
    event.preventDefault();

    var address = addressEl.value.trim();

    centerMap(address);
    // empty markers array upon click
    mapMarkers = []

} 




formEl.addEventListener("submit", submitButtonHandler);
