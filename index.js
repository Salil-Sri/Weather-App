const apikey = "1e2494c5a70424d70507b0b927eaf926"; // Replace with your actual API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
const cityname = document.querySelector(".search_icon input");
const button = document.querySelector(".btn");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city+ "&units=metric" + `&appid=${apikey}`); // Corrected API key inclusion

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check for API data errors (e.g., city not found)
    if (data.cod !== 200) {
      throw new Error(`API error: ${data.message}`);
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humid_per").innerHTML = data.main.humidity + "%";
    document.querySelector(".windspeed").innerHTML = data.wind.speed + "km/h";

  } catch (error) {
    console.error("Error fetching weather data:", error);
    // Display an error message to the user on the webpage
    document.querySelector(".error").textContent = "Error: " + error.message;
  }
}

button.addEventListener("click", function () {
  const city = cityname.value.trim(); 
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }
  checkWeather(city);  
});

cityname.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      const city = cityname.value.trim();
      if (city === "") {
        alert("Please enter a city name.");
        return;
      }
      checkWeather(city);
    }
  });