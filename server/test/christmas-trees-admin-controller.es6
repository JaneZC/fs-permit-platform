'use strict';

const jwt = require('jsonwebtoken');
const vcapConstants = require('../src/vcap-constants.es6');

const request = require('supertest');
const moment = require('moment');

const christmasTreePermitApplicationFactory = require('./data/christmas-trees-permit-application-factory.es6');
const server = require('./mock-aws.spec.es6');

const chai = require('chai');
const expect = chai.expect;
let permitId;
let invalidPermitId = 'xxxxxxxx-189d-43ba-xxxx-c233ef94f02f';
let paygovToken;
let tcsAppID;
let today = moment(new Date()).format('YYYY-MM-DD');

describe('christmas tree admin controller tests', () => {
  it('GET should return a 200 response for the given admin report parameters forest, start and end date', done => {
    request(server)
      .get(`/admin/christmas-trees/permits/1/${today}/${today}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        expect(res.body).to.include.all.keys('sumOfTrees', 'sumOfCost', 'numberOfPermits', 'permits');
      })
      .expect(200, done);
  });
  let submittedPermit, completedPermit;
  it('POST new permit to use in admin reports', done => {
    const permitApplication = christmasTreePermitApplicationFactory.create();
    permitApplication.forestId = 3;
    permitApplication.forestAbbr = 'mthood';
    permitApplication.orgStructureCode = '11-06-06';
    request(server)
      .post('/forests/christmas-trees/permits')
      .send(permitApplication)
      .expect('Content-Type', /json/)
      .expect(res => {
        submittedPermit = res.body;
      })
      .expect(200, done);
  });
  it('GET created permit to complete transaction', done => {
    request(server)
      .get(`/forests/christmas-trees/permits/${submittedPermit.permitId}`)
      .expect('Content-Type', /json/)
      .expect(permitRes => {
        completedPermit = permitRes.body;
      })
      .expect(200, done);
  });
  it('GET permit details back by the admin', done => {
    request(server)
      .get(`/admin/christmas-trees/permits/${completedPermit.permitTrackingId}`)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        expect(res.body.permits[0]).to.include.all.keys(
          'permitNumber',
          'issueDate',
          'quantity',
          'totalCost',
          'expireDate'
        );
      })
      .expect(200, done);
  });
  it('GET permit details back should get 400 for invalid permit number', done => {
    request(server)
      .get('/admin/christmas-trees/permits/123')
      .set('Accept', 'application/json')
      .expect(function(res) {
        expect(res.body.errors[0].message).to.equal('Permit 123 was not found.');
      })
      .expect(400, done);
  });

  it('PUT forest should return 200 when updating forest season dates', done => {
    const forestSeasonDates = {
      startDate: '2020-10-01',
      endDate: '2020-12-24'
    };
    request(server)
      .put('/admin/christmas-trees/forests/1')
      .send(forestSeasonDates)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('PUT forest should return 400 with an invalid forest id with season dates', done => {
    const forestSeasonDates = {
      startDate: '2020-10-01',
      endDate: '2020-12-24'
    };
    request(server)
      .put('/admin/christmas-trees/forests/5')
      .send(forestSeasonDates)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        expect(res.body.errors[0].message).to.equal('Forest 5 was not found.');
      })
      .expect(400, done);
  });
});
