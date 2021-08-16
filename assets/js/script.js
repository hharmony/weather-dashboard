var apiKey = "1a41d11e381d8d69893453d1845cf5b8";
var apiUrl1 = "http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid="
//var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
var cityFormEl = document.querySelector("#city-form"); //userFormEl
var nameInputEl = document.querySelector("#city-name");
var citySearchTermEl = document.querySelector("#city-search-term"); // repo search term
var weatherContainerEl = document.querySelector("#weather-container"); //repoContainerEl
var displayTemp = document.querySelector("#temp");
var today = moment();
var cityArr = [];


var formSubmitHandler = function(event) {
    //stop browser default action - send form input to a url
    event.preventDefault();
    //get value from input
    var city = nameInputEl.value.trim();

    if (city) {
        getWeather(city);

        nameInputEl.value = "";
    }else {
        alert("Please enter a city");
    }
    //console.log(event);
}

//get city coordinates out of apiUrl1 to use for weather info in apiUrl2
var getWeather = function(city) { //getUserRepos(user)

    var apiUrl1 = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    
    fetch(apiUrl1).then(function(response) {
        response.json().then(function(data) {            
            var lon = data.coord["lon"];
            var lat = data.coord["lat"];

            // console.log(data, city, lon, lat);
            //weather info using lon and lat
            var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";
            
            fetch(apiUrl2).then(function(response){
                response.json().then(function(weatherData){
                    // console.log(weatherData);
                    displayWeather(weatherData, city);
                    
                    var currentTemp = weatherData.current["temp"];
                    var currentWind = weatherData.current["wind_speed"];
                    var currentHumidity = weatherData.current["humidity"];
                    var currentUv = weatherData.current["uvi"];
                // console.log(currentTemp, currentWind, currentHumidity, currentUv, weatherData);
                displayWeather (data, currentTemp, currentWind, currentHumidity, currentUv, city);
            
                //clear old content
                weatherContainerEl.textContent = "";
                //display searched city name
                var today = moment();
                citySearchTermEl.textContent = city + "  " + today.format("MM-DD-YYYY"); 

                
                
                //create containers for T/W/H/U
                var tempEl = document.createElement("div");
                tempEl.classList = "col-12", "currentEl";   
                // add class lists*****
                var windEl = document.createElement("div");
                windEl.classList = "col-12", "currentEl"; 
                var humEl = document.createElement("div");
                humEl.classList = "col-12", "currentEl";
                var uvEl = document.createElement("div");
                uvEl.classList = "col-12", "currentEl";

                //create spans to hold data
                var tempDegEl = document.createElement("div");
                tempDegEl.textContent = "Current Temperature: " + currentTemp + "C";

                var windSpEl = document.createElement("div");
                windSpEl.textContent = "Wind Speed: " + currentWind + "km/h";

                var humidexEl = document.createElement("div");
                humidexEl.textContent = "Humidity: " + currentHumidity + "%";
               
                var uviEl = document.createElement("div");
                uviEl.textContent = "UV Index: " + currentUv;

                // append to container
                tempEl.appendChild(tempDegEl);
                windEl.appendChild(windSpEl);
                humEl.appendChild(humidexEl);
                uvEl.appendChild(uviEl);

                //append Container to dom
                weatherContainerEl.appendChild(tempEl);
                weatherContainerEl.appendChild(windEl);
                weatherContainerEl.appendChild(humidexEl);
                weatherContainerEl.appendChild(uviEl); 
            });
            })
        });
        
    });
};

var displayWeather = function(weather, city) {
    console.log(weather);
    console.log(city);

}

//5 day forecast


//create a function to display searched city


cityFormEl.addEventListener("submit", formSubmitHandler);


/*
var cityFormEl = document.querySelector("#city-form"); //userFormEl
var nameInputEl = document.querySelector("#city-name");
var weatherContainerEl = document.querySelector("#weather-container"); //repoContainerEl
var citySearchTermEl = document.querySelector("#city-search-term"); // repo search term
var apiKey = "1a41d11e381d8d69893453d1845cf5b8";


var coords = function(city) {
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

    //make request to url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            //get coordinates
            var lat = data.coord["lat"];
            var lon = data.coord["lon"];
            console.log(lat);
            //pass info into getWeather
            getWeather(city, lat, lon);
        })
    })
}



var getWeather = function(city) { //user = city
    //open weather api
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";    
    //var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";
    //make request to url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
            

            displayWeather(data);
            
            console.log(apiUrl);
        });

    });
};

var formSubmitHandler = function(event) {
    //stops browser from performing default action - submitting form, prevents input data going to a url
    event.preventDefault();
    //get value from input element and put into getWeather()
    var cityname = nameInputEl.value.trim();
    if (cityname) {
        getWeather(cityname);
        nameInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
};

cityFormEl.addEventListener("submit", formSubmitHandler);

//create a function to display searched city
var displayWeather = function(weather, searchTerm) {
    console.log(weather);
    //clear old content
    weatherContainerEl.textContent = "";
    //display searched city name
    citySearchTermEl.textContent = searchTerm;
   
};




/* fields to display
main.temp
main.humidity
wind.speed

one call
current.temp  ---For temperature in Celsius and wind speed in meter/sec, add to http &units=metric
current.windspeed
current.hummidity
current.uvi
*/

/* 
6.2.4 to handle form submission 

submit form, get value from input element (nameinputEl) and store it into its own variable (username)
.trim() to get rid of trailing or leading spaces
check value in username variable - pass it to getUserRepos

uses form to search github repos, next will display

api: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=1a41d11e381d8d69893453d1845cf5b8
*/
/* 
6.2.5 displaying repo

for loop - take each repo (repos[i]) and write some data to page - format appearance of name and repo name
div element
span to hold formatted repo name
add that to the div, and add entire div to container created earlier

*/