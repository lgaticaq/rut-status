'use strict'

const https = require('https')
const querystring = require('querystring')
const cheerio = require('cheerio')

module.exports = data => {
  return new Promise((resolve, reject) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    const qs = querystring.stringify({
      RUN: data.rut,
      type: data.type ? data.type.toUpperCase() : 'CEDULA',
      serial: data.serial
    })
    const options = {
      hostname: 'portal.sidiv.registrocivil.cl',
      port: 443,
      path: `/usuarios-portal/pages/DocumentRequestStatus.xhtml?${qs}`,
      method: 'GET'
    }
    const req = https.request(options, res => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request Failed. Status Code: ${res.statusCode}`))
      } else {
        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', chunk => {
          rawData += chunk
        })
        res.on('end', () => {
          try {
            const $ = cheerio.load(rawData)
            const status = $('#tableResult .setWidthOfSecondColumn').text()
            if (status === '') return reject(new Error('Not found'))
            resolve(status)
          } catch (err) {
            reject(err)
          }
        })
      }
    })
    req.on('error', err => reject(err))
    req.end()
  })
}
