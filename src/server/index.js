// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
// const fetch = require('node-fetch');
const axios = require('axios').default;

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


/////////////
//Start
/////////////

const dotenv = require('dotenv');
dotenv.config();


const checkForCity = require('./cityCheck.js')

// API Key for Geonames
let baseURL = 'http://api.geonames.org/searchJSON?q=';
const apiKey = process.env.API_KEY;

// API Key for Weatherbit
let baseWeatherbitURL = 'https://api.weatherbit.io/v2.0/current?';
const apiWeatherbitKey = process.env.API_KEY_Weatherbit;

// API Key for PixabayKey
let basePixabayURL = 'https://pixabay.com/api/?q=';
const apiPixabayKey = process.env.API_KEY_Pixabay;

//POST route
app.post('/addData', async (req, res) => {
    try {
        const userCity = req.body.city;
        const userDate = req.body.date;

        //First API
        let firstURL = encodeURI(`${baseURL}${userCity}${apiKey}`)
        const { data: baseData } = await axios.get(firstURL);
        console.log(firstURL)

        if (checkForCity(baseData) && baseData.geonames !== null && baseData.geonames.length > 0) {
            let lat = baseData.geonames[0].lat;
            let lng = baseData.geonames[0].lng;
            let countryName = baseData.geonames[0].countryName;

            //Second API
            let secondURL = encodeURI(`${baseWeatherbitURL}lat=${lat}&lon=${lng}${apiWeatherbitKey}`);
            const { data: weatherData } = await axios.get(secondURL);

            //Third API
            let thirdURL = encodeURI(`${basePixabayURL}${countryName}${apiPixabayKey}`);
            const { data: pixaBayData } = await axios.get(thirdURL);
            if (pixaBayData != null && pixaBayData.hits.length > 0) {
                let rnumb = Math.floor(Math.random() * 10)
                let myPhotoData = pixaBayData.hits[rnumb].webformatURL;
                let myTagsData = pixaBayData.hits[rnumb].tags;

                //Convert data to Object
                let updateUI = {
                    date: userDate,
                    cityData: baseData.geonames[0],
                    weatherData: weatherData.data[0],
                    myPhotoData: myPhotoData,
                    myTagsData: myTagsData
                }

                //Send data to Client
                const data = await updateUI;
                res.send(data);
            }
        }
    }
    catch (error) {
        console.log("error", error)
    }
});