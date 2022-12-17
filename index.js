// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/api", function (req, res) {
  const date = new Date()

  const unixDate = date.valueOf()
  res.json({ 'unix': unixDate, 'utc': date.toUTCString() })
});

app.get("/api/:date", function (req, res) {
  let date = req.params.date, responseDate, unix
  console.log(date, new Date(date))
  
  /* Regexs */
  const dateRegex = /^\d{4}[./-]\d{2}[./-]\d{2}$/
  const unixRegex = /^(\d{3,13})/
  
  /* Common Date */
  if (dateRegex.test(date)) {
    console.log('Date regex')
    
    responseDate = new Date(date)
    
    unix = responseDate.valueOf()
    responseDate = responseDate.toUTCString()
  } else
  
  /* Unix Date */
  if (unixRegex.test(date)) {
    console.log('Unix Regex')
    
    unix = parseFloat(date)
    responseDate = new Date(parseFloat(date)).toUTCString()
  } else
  
  /* String Date */
  {
    console.log('String Date')
    
    unix = new Date(date).valueOf()
    responseDate = new Date(date).toUTCString()
  }
  
  //responseDate = new Date(date).toUTCString()
  if (responseDate == "Invalid Date") res.json({ 'error': 'Invalid Date'})
  
  res.json({ 'unix': unix, 'utc': responseDate })
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 6000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
