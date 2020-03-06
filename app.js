const express  = require('express');
const axios    = require('axios');
const mysql    = require('mysql');
const app      = express();
const port     = 3000;
const API_URL  = 'https://api.kanye.rest/';
const dotenv   = require('dotenv').config();
let currentQuote = '';


const conn = mysql.createConnection({
        host:     'localhost',
        user:     'root',
        password:  process.env.PASS,
        database: 'kanye'

})

const  addMyQuote = (quote) => {
    conn.connect(err => console.error(err));
    const querySting = `insert into quotes(quote, created_at) values('${quote}', now())`;
    conn.query(querySting, (err, results, fields) => {
        if(err) console.log(err)
    })
    conn.end();

}


// app.get('/', (req, res) => res.sendFile(__dirname +
//     '/views/index.html'
//   ))

// app.get('/assets/output.js', (req, res) => {
//     res.sendFile(__dirname + '/assets/output.js')
// } )

app.get('/', (req, res) => {
    axios.get(API_URL)
    .then(response => {
        currentQuote = response.data.quote;
        res.send(`<header>
                        <h1>Kanye Quotes</h2>
                </header>
                <section id='output'>${currentQuote}</section>`
        );
        console.log(currentQuote);
    })
    .catch(err => console.log('Error: ', err))
})

app.get('/add', (req, res) => {
    console.log(currentQuote);
    addMyQuote(currentQuote);
    res.sendStatus(200);
})


app.get('/best', (req, res) => {
    conn.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
       
        res.send('connected as id ' + conn.threadId);

      });
    // conn.connect();
    // conn.query('select 21 as test', (err, 
    //     results, fields) => {
    //         if(err) console.log(err)
    //         console.log(results)
    //         res.send('ok');
    //         conn.end()
    //     })
})

app.listen(port, ()=> console.log(`Your app is listening on port ${port}!`))
