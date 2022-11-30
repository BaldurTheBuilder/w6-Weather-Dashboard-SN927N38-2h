var APIKey = "760d07c1f798bf6eb98e9295a20f84b6";
var chosenCity = $("#entered-city-name");
var searchButton = $("#submit-button");
var ourForm = $("#city-selection-form");
var currentWeather = $("#current-weather");
var fiveDayForecast = $("#five-day-forecast");
var cityLatitude;
var cityLongitude;

//this function actually retrieves the weather information based on our city selection.
function getWeatherInformation(enteredCity) {
    //build our URL. Make sure it changes from the defaults to imperial.
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + enteredCity + "&appid=" + APIKey + "&units=imperial";
    //fetch based on our URL
    fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            //storing latitude and longitude for use in the 5-day forecast
            cityLatitude = data.coord.lat;
            cityLongitude = data.coord.lon;
            //display our data
            displayWeatherAtCity(data, currentWeather);
        })
}

//WHEN I search for a city I am presented with current conditions for that city
var displayWeatherAtCity = function(weatherData, websiteCard) {
    //date,icon,temp,wind,humidity
    websiteCard.children().eq(0).text(weatherData.name + " (" +  dayjs().format("MM-DD-YYYY") +")");
    websiteCard.children().eq(1).attr("src", "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png");
    websiteCard.children().eq(2).text("Temp: " + weatherData.main.temp + " °F");
    websiteCard.children().eq(3).text("Wind: " + weatherData.wind.speed + " MPH");
    websiteCard.children().eq(4).text("Humidity: " + weatherData.main.humidity + " %");

}

var displayForecastAtCity = function() {
    //for 5-day forecast we need to convert to longitude/latitude
    
}



//when the user clicks the submit button, we read their selected city and get the weather for that location.
var handleCitySelection = function (event) {
    event.preventDefault();
    var selectedName = chosenCity.val();
    getWeatherInformation(selectedName);
    //get 5 day forecast
}

ourForm.on('submit', handleCitySelection);



//WHEN I search for a city I am presented with future conditions for that city

//WHEN I search for a city that city is added to the search history

//WHEN I view current city weather, I see the city name, the date, an icon representing weather conditions; the temp, humidity, and wind speed.

//WHEN I view the future forecast, I see a 5-day forecast with dates, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.

//WHEN I click on a city in the search history I am again presented with current and future conditions for that city

