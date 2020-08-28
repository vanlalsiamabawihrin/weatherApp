
const weatherIcons = document.querySelector('.image-holder');
const degreeNumber = document.querySelector('.degree p');
const weatherDescription = document.querySelector('#weather-description');
const notification = document.querySelector('.notification');
const userLocation = document.querySelector('#location');
const humidity = document.querySelector('.humidity p');
const KEY = "34e011907beba97d09fc0848267898ca";
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}


const weather ={};

weather.temperature = {
    unit : "celsius"
}
weather.humidity={
    unit : "celsius"
}

const KELVIN = 273 ;

if(!navigator.geolocation){
    notification.setAttribute("style", "display:block");
}
else{
    navigator.geolocation.getCurrentPosition(userCoordinates, showError)
}

function userCoordinates(Position){
    let latitude = Position.coords.latitude;
    let longitude = Position.coords.longitude;
    getWeather(latitude, longitude);
}
function showError(error){
    notification.style.display= "block";
    notification.style.display=`<p> ${error.message} </p>`;

}
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;
    console.log(api);
    fetch(api) .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp-KELVIN);
        console.log(weather.temperature.value);
        weather.humidity.value = Math.floor(data.main.humidity);
        console.log(weather.humidity.value);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;

    })
    .then(function(){
        displayWeather()
           
    
    });
}
function displayWeather(){
    weatherIcons.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    degreeNumber.innerHTML =`${weather.temperature.value}&deg <p>c</p>`;
    humidity.innerHTML = `<p>humidity :</p> ${weather.humidity.value}`;
    weatherDescription.innerHTML= `${weather.description}`;
    userLocation.innerHTML =`${weather.city}, ${weather.country}`;
    
}
