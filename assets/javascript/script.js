var APIKey = "760d07c1f798bf6eb98e9295a20f84b6";
var chosenCity = $("#entered-city-name");
var searchButton = $("#submit-button");
var ourForm = $("#city-selection-form");
var currentWeather = $("#current-weather");
var fiveDayForecast = $("#five-day-forecast");

//how to make an API call using just the city name:
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//this function actually retrieves the weather information based on our city selection.
function getWeatherInformation() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL);
        
}
//fetch(queryURL)

//This function is to run when the user pushes submit. It takes the input city and runs our forecast and current weather functions.
var handleCitySelection = function (event) {
    event.preventDefault();
    var selectedName = chosenCity.val();
    //getweatherinformation
    //get 5 day forecast
}




//WHEN I search for a city I am presented with current and future conditions for that city and that city is added to the search history

//WHEN I view current city weather, I see the city name, the date, an icon representing weather conditions; the temp, humidity, and wind speed.

//WHEN I view the future forecast, I see a 5-day forecast with dates, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.

//WHEN I click on a city in the search history I am again presented with current and future conditions for that city

