'use strict';

import request from 'request';
import cheerio from 'cheerio';
import Q from 'q';

export default (options, callback) => {
  const deferred = Q.defer();
  const qs = {
    RUN: options.rut,
    type: options.type,
    serial: options.serial
  };
  const url = 'https://portal.sidiv.registrocivil.cl/usuarios-portal/pages/DocumentRequestStatus.xhtml';
  request.get({url: url, qs: qs, rejectUnauthorized: false}, (err, response, body) => {
    if (err) {
      deferred.reject(err);
    } else if (response.statusCode !== 200) {
      deferred.reject(new Error('Not found'));
    } else {
      const $ = cheerio.load(body);
      const status = $('#tableResult .setWidthOfSecondColumn').text();
      if (status !== '') {
        deferred.resolve(status);
      } else {
        deferred.reject(new Error('Not found'));
      }
    }
  });

  deferred.promise.nodeify(callback);

  return deferred.promise;
};
