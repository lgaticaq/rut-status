'use strict';
/*eslint no-console: 0*/
import path from 'path';

import {expect} from 'chai';
import nock from 'nock';

import lib from '../lib';

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

    it('should return a vigent (callback)', (done) => {
      lib(options, (err, status) => {
        expect(err).to.be.null;
        expect(status).to.be.equal('Vigente');
        done();
      });
    });


    it('should return a vigent (promise)', (done) => {
      lib(options).then((status) => {
        expect(status).to.be.equal('Vigente');
        done();
      }).fail((err) => {
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

    it('should return a not vigent (callback)', (done) => {
      lib(options, (err, status) => {
        expect(err).to.be.null;
        expect(status).to.be.equal('No Vigente');
        done();
      });
    });

    it('should return a not vigent (promise)', (done) => {
      lib(options).then((status) => {
        expect(status).to.be.equal('No Vigente');
        done();
      }).fail((err) => {
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

    it('should return a not emitted (callback)', (done) => {
      lib(options, (err, status) => {
        expect(err).to.be.null;
        expect(status).to.be.equal('No Vigente ( No Emitido)');
        done();
      });
    });

    it('should return a not emitted (promise)', (done) => {
      lib(options).then((status) => {
        expect(status).to.be.equal('No Vigente ( No Emitido)');
        done();
      }).fail((err) => {
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('invalid data', () => {

    const options = {};

    beforeEach(() => {
      nock.disableNetConnect();
      nock('https://portal.sidiv.registrocivil.cl')
        .get('/usuarios-portal/pages/DocumentRequestStatus.xhtml')
        .replyWithFile(200, path.join(__dirname, 'invalid.html'));
    });

    it('should return a object vigent false (callback)', (done) => {
      lib(options, (err, status) => {
        expect(err).to.eql(new Error('Not found'));
        expect(status).to.be.undefined;
        done();
      });
    });

    it('should return a object vigent false (promise)', (done) => {
      lib(options).then((status) => {
        expect(status).to.be.undefined;
        done();
      }).fail((err) => {
        expect(err).to.eql(new Error('Not found'));
        done();
      });
    });
  });
});
