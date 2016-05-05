# rut-status

[![npm version](https://img.shields.io/npm/v/rut-status.svg?style=flat-square)](https://www.npmjs.com/package/rut-status)
[![npm downloads](https://img.shields.io/npm/dm/rut-status.svg?style=flat-square)](https://www.npmjs.com/package/rut-status)
[![Build Status](https://img.shields.io/travis/lgaticaq/rut-status.svg?style=flat-square)](https://travis-ci.org/lgaticaq/rut-status)
[![Coverage Status](https://img.shields.io/coveralls/lgaticaq/rut-status/master.svg?style=flat-square)](https://coveralls.io/github/lgaticaq/rut-status?branch=master)
[![dependency Status](https://img.shields.io/david/lgaticaq/rut-status.svg?style=flat-square)](https://david-dm.org/lgaticaq/rut-status#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/rut-status.svg?style=flat-square)](https://david-dm.org/lgaticaq/rut-status#info=devDependencies)
[![Join the chat at https://gitter.im/lgaticaq/rut-status](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg?style=flat-square)](https://gitter.im/lgaticaq/rut-status?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Check rut status in registro civil

## Installation

```bash
npm i -S rut-status
```

## Use

Available types:
- **CEDULA**: Cédula de identidad chilena
- **CEDULA_EXT**: Cédula de identidad a extranjeros
- **PASAPORTE_PG**: Pasaporte
- **PASAPORTE_DIPLOMATICO**: Pasaporte diplomático
- **PASAPORTE_OFICIAL**: Pasaporte oficial

[Try on Tonic](https://tonicdev.com/npm/rut-status)
```js
const rutStatus = require('rut-status');

const options = {
  rut: '11111111-1',
  type: 'CEDULA',
  serial: 'A111111111'
};

// Promise
rutStatus(options)
  .then(status => console.log(status))
  .fail(err => console.error(err));

// Callback
rutStatus(options, (err, status) => {
  if (err) return console.error(err);
  console.log(status);
});
```

Status:
- Vigente
- No Vigente
- No Vigente ( No Emitido)
