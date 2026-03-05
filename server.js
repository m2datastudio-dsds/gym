console.log('Starting server...');
require('dotenv').config();
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');

var indexRouter;
var b2SyncService;
var getUploadsDir;

try {
  var routes = require('./public/API/V1/routes');
  indexRouter = routes.indexRouter;
  
  var b2Module = require('./public/API/V1/services/b2SyncService');
  b2SyncService = b2Module.b2SyncService;
  
  var multerLocal = require('./public/API/V1/middlewares/multerLocal');
  getUploadsDir = multerLocal.getUploadsDir;
} catch (err) {
  console.error('Failed to load API routes or services:', err.message);
  console.error(err.stack);
  process.exit(1);
}

var app = express();
var http = require('http').Server(app); 


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

var uploadsDir = getUploadsDir();
console.log('Uploads directory:', uploadsDir);
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

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

process.on("uncaughtException", function(err) {
  console.error('Uncaught exception:', err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', function(reason, p) {
  console.error('Unhandled rejection:', reason);
});

  
http.listen(appPort, function() {
    console.log('app listening on port ' + appPort.toString());
    
    if (b2SyncService) {
        b2SyncService.startAutoSync(60000);
    }
});
 