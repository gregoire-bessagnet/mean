'use strict';

import rfs from 'rotating-file-stream';
import logger from 'morgan';
import fs from 'fs';

export default {
  
  configure: (app, production) => {
    if (production) {
      var logDirectory = 'dist/logs';
      // Ensure log directory exists
      fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
      // Set logger device on a rotating write stream
      app.use(logger('combined', {
        skip: function (req, res) {
          return res.statusCode < 400;
        },
        stream: rfs('mean.log', {
          path: logDirectory,
          interval: '1d'
        })
      }));    
    } else {
      app.use(logger('dev'));
    }
  }
}