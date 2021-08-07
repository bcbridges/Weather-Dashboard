var openWeather =
  "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=664962eef7f2cf7af32f08a6b013f9c8";

fetch(openWeather)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
