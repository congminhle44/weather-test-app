function weatherService() {
  this.getLocation = (address) => {
    return axios({
      method: "GET",
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDBunJ4GXNEC3KJlpoGJO-iB--CjPv4o-s&address=${address}`,
    });
  };
  this.getWeather = (lat, lng) => {
    return axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=daily&appid=7d2aa70c550c409f2a2e525f350b117a
      `,
    });
  };
}
