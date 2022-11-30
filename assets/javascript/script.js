var APIKey = "760d07c1f798bf6eb98e9295a20f84b6";
var chosenCity = $("#entered-city-name");
var searchButton = $("#submit-button");
var ourForm = $("#city-selection-form");
var currentWeather = $("#current-weather");
var fiveDayForecast = $("#5day");
var ourHistorySection = $('#history');
var cityLatitude;
var cityLongitude;

loadOurHistory();

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
            //storing latitude and longitude for use in the 5-day forecast
            cityLatitude = data.coord.lat;
            cityLongitude = data.coord.lon;
            //display our data
            displayWeatherAtCity(data, currentWeather);
            getForecastAtCity(cityLatitude,cityLongitude);
        })
}

//WHEN I search for a city I am presented with current conditions for that city
//WHEN I view current city weather, I see the city name, the date, an icon representing weather conditions; the temp, humidity, and wind speed.
var displayWeatherAtCity = function(weatherData, websiteCard) {
    //date,icon,temp,wind,humidity
    websiteCard.children().eq(0).text(weatherData.name + " (" +  dayjs().format("MM-DD-YYYY") +")");
    websiteCard.children().eq(1).attr("src", "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png");
    websiteCard.children().eq(2).text("Temp: " + weatherData.main.temp + " °F");
    websiteCard.children().eq(3).text("Wind: " + weatherData.wind.speed + " MPH");
    websiteCard.children().eq(4).text("Humidity: " + weatherData.main.humidity + " %");

}

var getForecastAtCity = function(chosenLat,chosenLon) {
    //for 5-day forecast we need to convert to longitude/latitude
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" +chosenLat + "&lon=" + chosenLon +"&appid="+ APIKey + "&units=imperial";
    fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            displayForecastAtCity(data, fiveDayForecast);
        })
}

//WHEN I search for a city I am presented with future conditions for that city
//WHEN I view the future forecast, I see a 5-day forecast with dates, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.
var displayForecastAtCity = function(forecastData, websiteSection){
    websiteSection.empty();
    var titleEl = $('<h3>');
    titleEl.attr('class','col-12')
    titleEl.text("5-day Forecast");
    websiteSection.append(titleEl);

    for (let index = 0; index < 5; index++) {
        var newDay = $('<div>');  
        newDay.attr('class', 'col-2 border border-primary m-2 bg-light');

        var dateEl = $('<p>');
        var iconEl = $('<img>');
        var tempEl = $('<p>');
        var windEl = $('<p>');
        var humidityEl = $('<p>');

        dateEl.text(" (" +  dayjs.unix(forecastData.list[index*8].dt).format("MM-DD-YYYY") +")");
        iconEl.attr("src", "https://openweathermap.org/img/w/" + forecastData.list[index*8].weather[0].icon + ".png");
        tempEl.text("Temp: " + forecastData.list[index*8].main.temp + " °F");
        windEl.text("Wind: " + forecastData.list[index*8].wind.speed + " MPH");
        humidityEl.text("Humidity: " + forecastData.list[index*8].main.humidity + " %");
            
        websiteSection.append(newDay);
        newDay.append(dateEl);
        newDay.append(iconEl);
        newDay.append(tempEl);
        newDay.append(windEl);
        newDay.append(humidityEl);
    }
}

//WHEN I search for a city that city is added to the search history
var saveToLocalStorage = function(currentCityName) {
    //we are going to save ten fields in local storage.
    //NOTE: we're leaving it to the user to make sure they enter a city and it has correct grammar.
    //when the user enters a name, we first check to see if the name is already in local storage.
    let currentlyStored = [];
    for (let index = 0; index < 10; index++) {
        currentlyStored[index] = localStorage.getItem(index);
        //first we see if the current location has storage. If it's empty, we can store the name.
        if(!currentlyStored[index]) {
            localStorage.setItem(index, currentCityName);
            break
        }
        //else, if the current storage is what the user just entered, we do nothing and leave since we don't need to repeat names.
        else if(currentCityName == currentlyStored[index]) {
            break
        }
        //lastly, if we reach the end of the array and it's full, we need to shift everything over and replace index 0.
        else if(index == 9) {
            for (let innerLoop = 1; innerLoop <10; innerLoop++) {
                localStorage.setItem(innerLoop, currentlyStored[innerLoop-1]);
            }
            localStorage.setItem(0,currentCityName);
        }
    }
}

function loadOurHistory() {
    for (let index = 0; index < 10; index++) {
        var savedInStorage = localStorage.getItem(index);
        if(savedInStorage) {
            var historyItem = $('<button>');
            historyItem.attr('class','btn btn-secondary');
            historyItem.attr('id', savedInStorage);
            historyItem.text(savedInStorage);
            ourHistorySection.append(historyItem);
        }
        else {
            break
        }
    }
}



//when the user clicks the submit button, we read their selected city and get the weather for that location.
var handleCitySelection = function (event) {
    event.preventDefault();
    //if we pushed the submit button
    if(event.originalEvent.submitter.id == "submit-button") {
        var selectedName = chosenCity.val();
        saveToLocalStorage(selectedName);
        getWeatherInformation(selectedName);
    }
    //WHEN I click on a city in the search history I am again presented with current and future conditions for that city
    else {
        var selectedName = event.originalEvent.submitter.id;
        saveToLocalStorage(selectedName);
        getWeatherInformation(selectedName);
    }
}

ourForm.on('submit', handleCitySelection);





