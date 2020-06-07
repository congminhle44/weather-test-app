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
        document.getElementById("lat").innerHTML = " " + lat + " , ";
        document.getElementById("lng").innerHTML = lng + " ";
        getWeatherStatus(lat, lng);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

document.getElementById("cancel").addEventListener("click", () => {
  document.getElementById("setLoc").style = "display:none";
});

getWeatherStatus = (lat, lng) => {
  weather
    .getWeather(lat, lng)
    .then((result) => {
      console.log(result.data);
      renderWeather(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

renderWeather = async (weather) => {
  let weatherTable = document.getElementById("weather");
  let d = new Date();
  let mm = d.getMonth() + 1;
  let yy = d.getFullYear();
  let content = "";
  weather.hourly.map((item, index) => {
    let dd = d.getDate() + index;
    let temp = item.temp - 273.15;
    let feel = item.feels_like - 273.15;
    if (dd < 32) {
      content += `
        <div class="weather-status-wrapper">
        <p class="date">${dd} / ${mm} / ${yy}</p>
          <div class="weather-title">
            <div class="weather-img">
            ${weatherSwitch(item.weather[0].description)}
            </div>
            <div class="weather-title-detail">
              <div class="weather-header">
                <p class="degree">${parseInt(temp)} &#8451;</p>
                <p>${item.weather[0].main}</p>
              </div>
              <div class="weather-body">
                <p>Feels like: ${parseInt(feel)} &#8451;</p>
                <p>Humidity: ${item.humidity}</p>
                <p>${item.weather[0].description}</p>
              </div>
            </div>
          </div>
        </div>
        `;
    }
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
