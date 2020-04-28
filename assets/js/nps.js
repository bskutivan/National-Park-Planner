











// Handlers and Event Listeners Below

function submitButtonHandler() {
    event.preventDefault();

    var address = addressEl.value.trim();

    centerMap(address);

} 




formEl.addEventListener("submit", submitButtonHandler);