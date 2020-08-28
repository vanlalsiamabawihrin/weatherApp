
const weatherIcons = document.querySelector('.image-holder');
const degreeNumber = document.querySelector('.degree p');
const weatherDescription = document.querySelector('#weather-description');
const notification = document.querySelector('.notification');
const userLocation = document.querySelector('#location');
const KEY = "34e011907beba97d09fc0848267898ca";
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}


const weather ={};

weather.temperature = {
    unit : "celsius"
}

const KELVIN = 273 ;

// if("geolocation" in navigator){
//     navigator.geolocation.getCurrentPosition
// }
// console.log(navigator);

// if('geolocation' in navigator){
//     navigator.geolocation.getCurrentPosition(userCoordinates, showError);
   

// }
// else{
//     notification.style.display = "block";
//     notification.innerHTML="<p> Your location is now turn on your computer</p>"
// }
if(!navigator.geolocation){
    notification.setAttribute("style", "display:block");
}
else{
    navigator.geolocation.getCurrentPosition(userCoordinates, showError)
}

// function setPosition(Position){
//     let latitude = Position.coords.latitude;
//     let longitude = Position.coords.longitude;
//     getWeather(latitude, longitude);
    
// }
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
        weather.temperature.value = Math.floor (data.main.temp-KELVIN);
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
    degreeNumber.innerHTML =`${weather.temperature.value}&deg<span>C<span>`;
    weatherDescription.innerHTML= `${weather.description}`;
    userLocation.innerHTML =`${weather.city}, ${weather.country}`;
    
}
