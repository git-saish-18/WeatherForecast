str = "";
let imgsym;
const time = new Date();

if (time.getHours()<=6 || time.getHours()>=18) {
  document.body.style.backgroundImage = `url("skyneight.jpg")`;
  document.getElementById("head").style.color = "gold";
  imgsym = "nightcloud.png";
} else {
  document.getElementById("head").style.color = "gold";
  document.body.style.backgroundImage = `url("background.jpg")`;
  imgsym = "cloudysun.png";
}
let heading = document.getElementById("head");
let temp = document.getElementById("temperature");
let hum = document.getElementById("humidity");
let windspeed = document.getElementById("wind_speed");
let wind_degrees = document.getElementById("wind_degrees");
let mintemp = document.getElementById("min-temp");
let maxtemp = document.getElementById("max-temp");
let sunnyimg = document.getElementById("imgnature");
const getvideo = async (city) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9c68234a9dmshcbdb4a9698ced4dp1b270fjsn553e14a97861",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };
  let responace;
  let data = await fetch(
    `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`,
    options
  )
    .then((res) => {
      responace = res.status;
      return res.json();
    })
    .then((parsed) => {
      if (responace==200) {
        heading.innerHTML = "Weather of The city - " + city;
        temp.innerHTML = "" + parsed.temp + "°C";
        let get = `<img src="${imgsym}" class="sunnyimg" alt="" srcset=""></img>`;
        imgnature.innerHTML = get;
        mintemp.innerHTML = "Min_temp " + parsed.min_temp + "°C";
        maxtemp.innerHTML = "Max_temp " + parsed.max_temp + "°C";
        hum.innerHTML = "" + parsed.humidity + "%";
        windspeed.innerHTML = "Wind Speed " + parsed.wind_speed;
        wind_degrees.innerHTML = "Wind Degree " + parsed.wind_degrees;
      } else {
        
        alert("Please Enter valid City Name...⚠️");
      }
    });
};
const getsample = async (city) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9c68234a9dmshcbdb4a9698ced4dp1b270fjsn553e14a97861",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };
  str = "";
  let data = await fetch(
    `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`,
    options
  )
    .then((res) => {
      console.log(res.status);
      console.log(res.ok);
      return res.json();
    })
    .then((parsed) => {
      let sky_behave = "";
      if (parsed.temp > 35) {
        sky_behave = " So Hot ";
      } else if (parsed.temp > 15 && parsed.temp < 35) {
        sky_behave = " Lightly Hot ";
      } else if (parsed.temp > 0 && parsed.temp < 15) {
        sky_behave = " Lightly Cold ";
      } else {
        sky_behave = " Cold  ";
      }
      str += `<div class ="singlecities">
            <h2 class="singlecity">${city}</h2>
            <p class ="para">Temperature ${parsed.temp}°C</p>
            <p class ="para">Humidity ${parsed.humidity} %</p>
            <p class ="para"><img src=${imgsym}></p>
            <p class ="para">${sky_behave}</p>
            </div>
      `;
    });
  document.getElementById("tempcity").innerHTML = str;
};
let cities = ["Nashik", "New york", "Delhi", "Pune", "Mumbai", "Berlin"];
cities.forEach((city) => {
  getsample(city);
});
getvideo("Shirdi");
search.addEventListener("click", (e) => {
  e.preventDefault();
  if (get.value != "") {
    getvideo(get.value);
  } else {
    alert("Please Enter valid City Name...⚠️");
  }
});
