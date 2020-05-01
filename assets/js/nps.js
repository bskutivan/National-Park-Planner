const api_key = 'kWSmA8a1lM5M5VscIAoYqjQiYWUSCWZ2NwRm4Jt4'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';
var stateCode = specifiedStateCode;
var resultsListEl = document.getElementById('results-list')

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName} - Location: ${responseJson.data[i].states}</h3>
      <p>Address: ${responseJson.data[i].latLong}</p>
      <p>Description: ${responseJson.data[i].description}</p>
      <p>Activities: ${responseJson.data[i].activities.name}</p>
      <p>URL: <a href="${responseJson.data[i].url}"</a>${responseJson.data[i].url}</p>
      </li>`
    )}; 
  $('#results').removeClass('hidden');
};


function getParks(stateCode, limit=10) {
  const params = {
    api_key,
    stateCode,
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
    .catch(err => {
      $('#error-message').text(`Something went wrong: ${err.message}`);
    });
}

// Handlers and Event Listeners Below

function submitButtonHandler() {
    event.preventDefault();

    var address = addressEl.value.trim();

    centerMap(address);
    getParks(specifiedStateCode);

} 
formEl.addEventListener("submit", submitButtonHandler);

document.getElementById('save-btn').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('savedData', resultsListEl.innerHTML);
    document.getElementById('saved-results-list').innerHTML = localStorage.getItem('savedData');
});




