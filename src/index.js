'use strict';

import cheerio from 'cheerio';
import Q from 'q';
import rp from 'request-promise';

const getStatus = (data, cb) => {
  const deferred = Q.defer();
  const qs = {
    RUN: data.rut,
    type: data.type ? data.type.toUpperCase() : 'CEDULA',
    serial: data.serial
  };
  const options = {
    url: 'https://portal.sidiv.registrocivil.cl/usuarios-portal/pages/DocumentRequestStatus.xhtml',
    qs: qs,
    rejectUnauthorized: false,
    transform: (body) => cheerio.load(body)
  };
  rp(options).then(($) => {
    const status = $('#tableResult .setWidthOfSecondColumn').text();
    if (status === '') deferred.reject(new Error('Not found'));
    deferred.resolve(status);
  }).catch((err) => deferred.reject(err));
  deferred.promise.nodeify(cb);
  return deferred.promise;
};

module.exports = getStatus;
