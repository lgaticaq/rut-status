const rutStatus = require('rut-status')

const options = {
  rut: '11111111-1',
  type: 'CEDULA',
  serial: 'A111111111'
}

const status = await rutStatus(options)
