// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

var path = require('path')
const express = require('express')
// const mockAPIResponse = require('./mockAPI.js')
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
// You could call it aylienapi, or anything else
// var textapi = new aylien({
//     application_id: "your-api-id",
//     application_key: "your-key"
//   });

const dotenv = require('dotenv');
dotenv.config();

console.log(`Your API key is ${process.env.API_KEY}`);

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.meaningcloud.com/sentiment-2.1'
const apiKey = process.env.API_KEY;

//POST route
app.post('/addData', async (req, res) => {
    try {
        const userRequest = req.body.text;
        console.log(`Request from user: ${userRequest}`);
        let myURL = encodeURI(`${baseURL}?key=${apiKey}&txt=${userRequest}&lang=en`);
        const { data: syntaxData } = await axios.get(myURL);
        //console.log(myURL);
        //console.log(syntaxData);
        const data  = await syntaxData;
        console.log(data);
        res.send(data);
    } 
    catch (error) {
        console.log("error", error)
    }
});
