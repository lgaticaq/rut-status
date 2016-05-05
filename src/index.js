'use strict';

const cheerio = require('cheerio');
const rp = require('request-promise');

module.exports = data => {
  const qs = {
    RUN: data.rut,
    type: data.type ? data.type.toUpperCase() : 'CEDULA',
    serial: data.serial
  };
  const options = {
    url: 'https://portal.sidiv.registrocivil.cl/usuarios-portal/pages/DocumentRequestStatus.xhtml',
    qs: qs,
    rejectUnauthorized: false,
    transform: cheerio.load
  };
  return rp(options).then($ => {
    const status = $('#tableResult .setWidthOfSecondColumn').text();
    if (status === '') throw new Error('Not found');
    return status;
  });
};
