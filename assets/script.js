// Need to get the day for the searched city, ie if I search London and they are a day ahead.
var currentDay = moment().format("MMMM Do, YYYY");
console.log(currentDay);

// For testing purposes only
var locationTest =
  "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=664962eef7f2cf7af32f08a6b013f9c8";
// q param is searching for the city
// units param is returning temp values in farenheit
// appid is api key -> look how to keep this hidden on GitHub

fetch(locationTest)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // For informational purposes only
    console.log(data);

    var cityName = data.name;
    var cityTemp = data.main.temp;
    var cityWind = data.wind.speed;
    var cityHumidity = data.main.humidity;
    var weatherIconCode = data.weather[0].icon;
    var weatherIconLink =
      "http://openweathermap.org/img/wn/" + weatherIconCode + ".png";

    $("h2").text(cityName + " (" + currentDay + ")");
    $("#currentIcon").attr("src", weatherIconLink);
    $("#currentTemp").text("Current Temp: " + cityTemp + "°F");
    $("#currentWind").text("Wind Speed: " + cityWind + " MPH");
    $("#currentHumid").text("Humidity " + cityHumidity + "%");
  });

// need temp, wind, humidity, uv, and city name
