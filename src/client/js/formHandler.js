import { checkForSentence } from "./sentenceCheck";
import axios from 'axios';

function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('sentence').value
    if(checkForSentence(formText)){
        fetch('http://localhost:8081/addData', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: formText})
        }
        )
        .then(res => {return res.json()})
        .then(function (data) {
            console.log(data)
            document.getElementById('subjectivity').innerHTML = data.subjectivity;
            document.getElementById('agreement').innerHTML = data.agreement;
            document.getElementById('confidence').innerHTML = data.confidence + '%';
            document.getElementById('irony').innerHTML = data.irony;
        })}
        else {
            alert("Please enter a valid Sentence!")
            console.log("Error: Sentence cannot be empty")
        }
}

export { handleSubmit }
