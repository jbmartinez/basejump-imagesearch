/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/imagesearch', require('./api/imagesearch'));

  app.route('/')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|components|app)/*')
    .get(errors[404]);
};
