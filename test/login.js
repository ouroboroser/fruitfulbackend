const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../')
const models = require('../models/index')
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwt_config');

const expect = chai.expect;

let token = null;

chai.use(chaiHttp)

describe('user authentication', () => {

    after(done => {
        models.User.destroy({
            where:{
                nick:'testuser12'
            }
        })
        done();
    })

    it('CORRECT DATA 200', done => {
        chai.request('http://localhost:3001')
        .post('/signup')
        .send({
            nick:'testuser12',
            name:'testuser12',
            email:'testuser12@gmail.com',
            password:'testuser12'
        })
        .end((error, res) => {
            expect(res).to.have.status(200)
            done();
        })
        
    })


    it('LOGIN INCORRECT NICK 400', done => {
        chai.request('http://localhost:3001')
        .post('/login')
        .send({
            nick:'test',
            password:'testuser12'
        })
        .end((error, res) => {
            expect(res).to.have.status(400)
            done();
        })
        
    })

    it('LOGIN INCORRECT PASSWORD 400', done => {
        chai.request('http://localhost:3001')
        .post('/login')
        .send({
            nick:'testuser12',
            password:'test'
        })
        .end((error, res) => {
            expect(res).to.have.status(400)
            done();
        })
        
    })

    // DONE

    it('LOGIN CORRECT DATA 200', done => {

        chai.request('http://localhost:3001')
        .post('/login')
        .send({
            nick:'testuser12',
            password:'testuser12'
        })
        .end((error, res) => {
            expect(res).to.have.status(200)
            done();
        })
        
    })

})
