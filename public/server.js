var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');
var app = express();
var http = require('http').Server(app); 
const { indexRouter } = require('./API/V1/routes/index');


var appPort = 1818;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(express.static(path.resolve(__dirname)));

app.use(cors({
  "origin": "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use('/api', indexRouter);

// app.use(express.static(path.join(__dirname, 'build')));
// app.use('*/css',express.static(path.join(__dirname,'static/css')));
// app.use('*/js',express.static(path.join(__dirname,'static/js')));
// app.use('*/icons',express.static(path.join(__dirname,'static/icons')));
// app.use('*/illustrations',express.static(path.join(__dirname,'static/illustrations')));
// app.use('*/media',express.static(path.join(__dirname,'static/media')));
// app.use('*/images',express.static(path.join(__dirname,'static/mock-images')));
 
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,accessToken,accesstoken, devicetoken, Accept, api-key,udid,device-type,Authorization");
  next();
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname)+'/index.html');
});

process.on("uncaughtException",function(err){
  // //console.log("Error occured an caught in uncaughtException",err);
});

process.on('unhandledRejection', function(reason, p){
    // //console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    //process.exit();
    // application specific logging here
});

  
http.listen(appPort, function() {
    console.log('app listening on port ' + appPort.toString());
});
 