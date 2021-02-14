/* eslint-disable no-undef */
const expect = require('chai').expect
const supertest = require('supertest')
const { config } = require('../utils/utils');
const api = supertest(`${config.host}`)
console.log(`${config.host}`)

const topic = 'constants'
const url = "https://google.com"

describe('Subscription Test', () => {
  it('Should fail to subscibe if url is not passed', (done) => {
    api
      .post(`subscribe/${topic}`)
      .set('Accept', 'application/json')
      .expect(412)
      .end((err, res) => {
        expect(res.body.status).to.equal('failed')
        done()
      })
  }).timeout(30000)

  it('Should fail to subscibe if topic is a number', (done) => {
    api
      .post(`subscribe/1`)
      .set('Accept', 'application/json')
      .expect(412)
      .end((err, res) => {
        expect(res.body.status).to.equal('failed')
        done()
      })
  }).timeout(30000)

  it('Should subscribe to a topic', (done) => {
    api
      .post(`subscribe/${topic}`)
      .set('Accept', 'application/json')
      .send({
        url
      })
      .expect(200)
      .end((err, res) => {
        console
        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Subscription created successfully')
        expect(res.body.data.url).to.equal(url)
        expect(res.body.data.topic).to.equal(topic)
        done()
      })
  }).timeout(30000)
  // /publish/:topic
  it('Should publish to a topic', (done) => {
    const data = {
        message: "burrow"
      }
    api
      .post(`publish/${topic}`)
      .set('Accept', 'application/json')
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('data published successfully')
        expect(res.body.data.topic).to.equal(topic)
        expect(res.body.data.data.message).to.equal(data.message)
        done()
      })
  }).timeout(30000)
  
})