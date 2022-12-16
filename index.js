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

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/:date", function (req, res) {
  const date = (req.params.date)

  let responseDate, unixDate

  if(date.includes('-')) {
    responseDate = new Date(date)
    unixDate = responseDate.getTime() / 1000
  } else {
    unixDate = parseFloat(date)
    responseDate = new Date(unixDate * 1000)
  }

  res.json({ 'unix': unixDate, 'utc': responseDate.toUTCString() })
});

// listen for requests :)
var listener = app.listen(/*process.env.PORT*/ 6000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
