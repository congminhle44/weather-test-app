let weather = new weatherService();

let getLoc = false;
document.getElementById("cancel").style = "display:none";

document.getElementById("findLoc").addEventListener("click", () => {
  const addressLoc = document.getElementById("locadd").value;
  weather
    .getLocation(addressLoc)
    .then((result) => {
      if (addressLoc) {
        getLoc = true;
        document.getElementById("cancel").style = "display:block";
        document.getElementById("setLoc").style = "display:none";
        document.getElementById("address").innerHTML =
          result.data.results[0].formatted_address;
        let { lat, lng } = result.data.results[0].geometry.location;
        getWeatherStatus(lat, lng);
      }
    })
    .catch((err) => {
      return err;
    });
});

document.getElementById("cancel").addEventListener("click", () => {
  document.getElementById("setLoc").style = "display:none";
});

getWeatherStatus = (lat, lng) => {
  weather
    .getWeather(lat, lng)
    .then((result) => {
      renderWeather(result.data);
      renderCurrent(result.data.current);
    })
    .catch((err) => {
      return err;
    });
};
renderCurrent = (weatherStatus) => {
  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  document.getElementById("current").innerHTML = `
            <div class="weather-current-content">
            <h5>Current updated as of ${h}:${m}</h5>
              <div class="weather-current-header">
                <div class="weather-showoff">
                  ${weatherSwitch(weatherStatus.weather[0].description)}
                </div>
                <div class="weather-header-content">
                  <p class="degree">${parseInt(
                    weatherStatus.temp - 273.15
                  )} <span class="cel">&#8451;</span></p>
                  <p class="status">${weatherStatus.weather[0].description}</p>
                </div>
              </div>
              <div class="weather-current-detail">
                <div class="line1">
                  <p>Feels like: ${parseInt(
                    weatherStatus.feels_like - 273.15
                  )} &#8451;</p>
                  <p>Wind: ${weatherStatus.wind_speed} km/h</p>
                  <p>UV: ${parseInt(weatherStatus.uvi)}</p>
                </div>
                <div class="line2">
                  <p>Barometer: ${weatherStatus.pressure} mb</p>
                  <p>Humidity: ${weatherStatus.humidity}%</p>
                  <p>Dew Point: ${parseInt(
                    weatherStatus.dew_point - 273.15
                  )}&#8451;</p>
                </div>
              </div>
            </div>
  `;
};
renderWeather = async (weather) => {
  let weatherTable = document.getElementById("weather");
  let content = "";
  await weather.hourly.slice(0, 12).map((item, index) => {
    let d = new Date();
    let h = d.getHours();
    let temp = item.temp - 273.15;
    let feel = item.feels_like - 273.15;
    content += `
      <div class="weather-status-wrapper">
        <div class="weather-title">
          <div class="weather-img">
          ${weatherSwitch(item.weather[0].description)}
          </div>
          <div class="weather-title-detail">
          <div class="header-wrapper">
          <p class="date">${h + index > 24 ? h + index - 24 : h + index} : 00
           ${
             h + index >= 12 && h + index !== 24 && h + index - 24 >= 12
               ? "pm"
               : "am"
           }</p>
            <div class="weather-header">
              <p class="degree">${parseInt(temp)} &#8451;</p>
              <p>${item.weather[0].main}</p>
            </div>
          </div>
            <div class="weather-body">
              <p>Feels like: ${parseInt(feel)} &#8451;</p>
              <p>Humidity: ${item.humidity}%</p>
              <p>${item.weather[0].description}</p>
            </div>
          </div>
        </div>
      </div>
      `;
  });
  return (weatherTable.innerHTML = content);
};

document.getElementById("showSearch").addEventListener("click", () => {
  document.getElementById("setLoc").style = "display:block";
});

weatherSwitch = (weather) => {
  switch (weather) {
    case "moderate rain":
      return `<img src="./PNG/weather_icon-36.png" alt="weather status" />`;
    case "light rain":
      return `<img src="./PNG/weather_icon-19.png" alt="weather status" />`;
    case "broken clouds":
      return `<img src="./PNG/weather_icon-42.png" alt="weather status" />`;
    case "overcast clouds":
      return `<img src="./PNG/weather_icon-16.png" alt="weather status" />`;
    case "few clouds":
      return `<img src="./PNG/weather_icon-39.png" alt="weather status" />`;
    case "scattered clouds":
      return `<img src="./PNG/weather_icon-42.png" alt="weather status" />`;
    case "clear sky":
      return `<img src="./PNG/weather_icon-17.png" alt="weather status" />`;
    default:
      return `<img src="./PNG/weather_icon-70.png" alt="Cant't find this weather image" />`;
  }
};
