const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const API_URL = 'https://api.kanye.rest/';

// app.get('/', (req, res) => res.sendFile(__dirname +
//     '/views/index.html'
//   ))

// app.get('/assets/output.js', (req, res) => {
//     res.sendFile(__dirname + '/assets/output.js')
// } )

app.get('/', (req, res) => {
    axios.get(API_URL)
    .then(response => {
        var quote = response.data.quote;
        res.send(`<header>
                        <h1>Kanye Quotes</h2>
                </header>
                <section id='output'>${quote}</section>`
        );
        console.log(quote);
    })
    .catch(err => console.log('Error: ', err))
})



app.listen(port, ()=> console.log(`Your app is listening on port ${port}!`))

app.get('/', (req, res) => {
})