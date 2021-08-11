// Need to get the day for the searched city, ie if I search London and they are a day ahead.
var currentDay = moment().format("MMMM Do, YYYY");

// Calls API to get weather info. Populates webpage with current information.
function getCurrentWeather() {
  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // For informational purposes only
      console.log(data.cod);
      console.log(data.name);

      if (data.cod == 200) {
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
        console.log("This is a valid location");
        console.log(searchHistory);
        searchHistory.push(data.name);
        var historyButton = $("<button>")
          .addClass("btn btn-secondary col-lg-12 mb-3")
          .attr("type", "button")
          .text(data.name);
        $("#searchHistory").append(historyButton);
      } else {
        alert("Please enter in a valid location.");
      }
    });
}

// Local storage to hold previously searched cities
var searchHistory = [];
// Calls local storage and creates a button for each city below the search bar.
function populateSearchHistory() {
  searchHistory = JSON.parse(localStorage.getItem("searchHistLocal"));
  if (searchHistory == null) {
    searchHistory = [];
  } else {
    $.each(searchHistory, function (i) {
      var historyButton = $("<button>")
        .addClass("btn btn-secondary col-lg-12 mb-3")
        .attr("type", "button")
        .text(searchHistory[i]);
      $("#searchHistory").append(historyButton);
    });
  }
}

// Create click listener to call API and fill in current weather information.
// Saves the searched city to populate the history buttons
var searchCity;
var currentWeather;
var fiveDayWeather;
$("button").on("click", function () {
  // Inserts searched city into API endpoint
  searchCity = $("input").first().val();

  currentWeather =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchCity +
    "&units=imperial&appid=664962eef7f2cf7af32f08a6b013f9c8";

  fiveDayWeatherURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchCity +
    "&units=imperial&appid=664962eef7f2cf7af32f08a6b013f9c8";
  // Calls API using searched city
  getCurrentWeather($(this));
  fiveDayWeather($(this));
});

// Fetches API for 5 day weather and then populates HTML with returned info
function fiveDayWeather() {
  fetch(fiveDayWeatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.cod == 200) {
        dayCounter = 0;
        while (dayCounter < 40) {
          var weatherDate = data.list[dayCounter].dt_txt;
          var dateIconCode = data.list[dayCounter].weather[0].icon;
          var dateTemp = data.list[dayCounter].main.feels_like;
          var dateWind = data.list[dayCounter].wind.speed;
          var dateHumidity = data.list[dayCounter].main.humidity;
          var weatherIconLink =
            "http://openweathermap.org/img/wn/" + dateIconCode + ".png";

          var dayid = "#day" + dayCounter;
          var tempid = "#day" + dayCounter + "Temp";
          var windid = "#day" + dayCounter + "Wind";
          var humidid = "#day" + dayCounter + "Humidity";
          var iconid = "#day" + dayCounter + "Icon";

          $(dayid).text(weatherDate);
          $(iconid).attr("src", weatherIconLink);
          $(tempid).text("Temp: " + dateTemp + "°F");
          $(windid).text("Wind: " + dateWind + " MPH");
          $(humidid).text("Humidity: " + dateHumidity + " %");
          dayCounter += 8;
        }
      }
    });
}

searchCity = "Denver";
initialPopulate();
function initialPopulate() {
  currentWeather =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchCity +
    "&units=imperial&appid=664962eef7f2cf7af32f08a6b013f9c8";

  fiveDayWeatherURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchCity +
    "&units=imperial&appid=664962eef7f2cf7af32f08a6b013f9c8";
  // Calls API using searched city
  getCurrentWeather($(this));
  fiveDayWeather($(this));
}
