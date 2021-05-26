/* 
6.2.4 to handle form submission 

submit form, get value from input element (nameinputEl) and store it into its own variable (username)
.trim() to get rid of trailing or leading spaces
check value in username variable - pass it to getUserRepos

uses form to search github repos, next will display

api: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=1a41d11e381d8d69893453d1845cf5b8
*/

var getWeather = function(city) {
    //open weather api
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1a41d11e381d8d69893453d1845cf5b8";    

    //make request to url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
            console.log(data);
        });
    });
};


getWeather("New York");
/* 
6.2.5 displaying repo

for loop - take each repo (repos[i]) and write some data to page - format appearance of name and repo name
div element
span to hold formatted repo name
add that to the div, and add entire div to container created earlier

*/