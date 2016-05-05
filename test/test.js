'use strict';

const path = require('path');
const expect = require('chai').expect;
const nock = require('nock');
const lib = require('../src');

describe('rut-status', () => {

  describe('vigent', () => {

    const options = {
      rut: '11111111-1',
      type: 'CEDULA',
      serial: 'A111111111'
    };

    beforeEach(() => {
      const query = {
        RUN: options.rut,
        type: options.type,
        serial: options.serial
      };
      nock.disableNetConnect();
      nock('https://portal.sidiv.registrocivil.cl')
        .get('/usuarios-portal/pages/DocumentRequestStatus.xhtml')
        .query(query)
        .replyWithFile(200, path.join(__dirname, 'vigent.html'));
    });

    it('should return a vigent', done => {
      lib(options).then(status => {
        expect(status).to.be.equal('Vigente');
        done();
      }).catch(err => {
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('not vigent', () => {

    const options = {
      rut: '11111111-1',
      type: 'CEDULA',
      serial: 'A111111111'
    };

    beforeEach(() => {
      const query = {
        RUN: options.rut,
        type: options.type,
        serial: options.serial
      };
      nock.disableNetConnect();
      nock('https://portal.sidiv.registrocivil.cl')
        .get('/usuarios-portal/pages/DocumentRequestStatus.xhtml')
        .query(query)
        .replyWithFile(200, path.join(__dirname, 'not-vigent.html'));
    });

    it('should return a not vigent', done => {
      lib(options).then(status => {
        expect(status).to.be.equal('No Vigente');
        done();
      }).catch(err => {
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('not emitted', () => {

    const options = {
      rut: '11111111-1',
      type: 'CEDULA',
      serial: 'A111111111'
    };

    beforeEach(() => {
      const query = {
        RUN: options.rut,
        type: options.type,
        serial: options.serial
      };
      nock.disableNetConnect();
      nock('https://portal.sidiv.registrocivil.cl')
        .get('/usuarios-portal/pages/DocumentRequestStatus.xhtml')
        .query(query)
        .replyWithFile(200, path.join(__dirname, 'not-emitted.html'));
    });

    it('should return a not emitted', done => {
      lib(options).then(status => {
        expect(status).to.be.equal('No Vigente ( No Emitido)');
        done();
      }).catch(err => {
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('invalid data', () => {

    const options = {};

    beforeEach(() => {
      const query = {type: 'CEDULA'};
      nock.disableNetConnect();
      nock('https://portal.sidiv.registrocivil.cl')
        .get('/usuarios-portal/pages/DocumentRequestStatus.xhtml')
        .query(query)
        .replyWithFile(200, path.join(__dirname, 'invalid.html'));
    });

    it('should return a object vigent false', done => {
      lib(options).then(status => {
        expect(status).to.be.undefined;
        done();
      }).catch(err => {
        expect(err).to.eql(new Error('Not found'));
        done();
      });
    });
  });
});
