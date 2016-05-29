var express = require('express'),
  bodyParser = require('body-parser'),
  http = require('http'),
  collections    = require('./routes/collections'),
  articles    = require('./routes/articles'),
  logger = require('morgan');

var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(logger());

app.get('/', function(req, res, next) {
  res.send('Select a collection, e.g., /collections/messages')
});

app.use('/collections', collections);
app.use('/articles', articles);

app.listen(3000, function(){
  console.log ('Server is running')
});

var server = http.createServer(app);
var boot = function () {
  server.listen(app.get('port'), function(){
    console.info('Express server listening on port ' + app.get('port'));
  });
};

var shutdown = function() {
  server.close();
};

if (require.main === module) {
  boot();
} else {
  console.info('Running app as a module')
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}