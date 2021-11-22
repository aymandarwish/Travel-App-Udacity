import { checkForSentence } from "./sentenceCheck";
// import axios from 'axios';

let submit = document.getElementById('generate');
if (submit) {
    submit.addEventListener('click', handleSubmit);
}
function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let myCity = document.getElementById('city').value;
    let myDate = document.getElementById('date').value;
    if (checkForSentence(city && myDate)) {
        fetch('http://localhost:8081/addData', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city: myCity, date: myDate })
        })
            .catch(function (e) {
                console.log("error");
            })
            .then(res => { return res.json() })
            .then(function (data) {
                // console.log(data)
                document.getElementById('app').style.backgroundImage = `url('${data.myPhotoData}')`;
                // document.querySelector('#result-wrapper').classList.add("card");
                document.querySelector('.location-name').innerHTML =
                    `<h1><strong> My trip to : </strong></h1>
                <p>${data.cityData.toponymName}, ${data.cityData.countryName}</p>
                <hr />`;
                document.querySelector('.weather').innerHTML =
                    `<div class="weather">
                    <h1>
                        <strong>Typical weather for then: </strong>
                    </h1>
                    <div class="weather-info">
                        <p>
                            <span>High- </span>${data.weatherData.temp} °C
                            <span>&nbsp; &nbsp; Low- </span>${data.weatherData.app_temp} °C
                            <br />
                            <br />
                            <span>${data.weatherData.weather.description}</span>
                        </p>
                        <img src="https://www.weatherbit.io/static/img/icons/${data.weatherData.weather.icon}.png" alt="Weather Icon" />
                    </div>
                    <hr />
                </div>`;
                document.querySelector('.time').innerHTML =
                    `<h1><strong> Departing: </strong></h1>
                <p class="uppercase">${myDate}</p>`;
                //data.weatherData.ob_time
            })
    }
    else {
        alert("Please enter a valid Sentence!")
        console.log("Error: Sentence cannot be empty")
    }
}

export { handleSubmit }
