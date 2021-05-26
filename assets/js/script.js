var apiKey = "1a41d11e381d8d69893453d1845cf5b8";
var apiUrl1 = "http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid="
//var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
var cityFormEl = document.querySelector("#city-form"); //userFormEl
var nameInputEl = document.querySelector("#city-name");
var citySearchTermEl = document.querySelector("#city-search-term"); // repo search term


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
        if (response.ok) {
        response.json().then(function(data) {            
            var lon = data.coord["lon"];
            var lat = data.coord["lat"];

            console.log(data, city, lon, lat);
            //weather info using lon and lat
            var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
            
            fetch(apiUrl2).then(function(response){
                response.json().then(function(stuff){
                    console.log(stuff);
                })
            })
        });
        };
    });
};



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