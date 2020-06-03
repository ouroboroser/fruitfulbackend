const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const models = require('../models/index')

const expect = chai.expect;

chai.use(chaiHttp)

describe('user registration', () => {

    after(done => {
        models.User.destroy({
            where:{
                nick:'testuser123456'
            }
        })
        done();
    })

    it('INCORRECT DATA 400', done => {
        chai.request('http://localhost:3001')
        .post('/signup')
        .send({
            nick:'test',
            name:'test',
            email:'test',
            password:'test'
        })
        .end((error, res) => {
            expect(res).to.have.status(400)
            done();
        })
        
    })

    it('INCORRECT EMAIL 400', done => {
        chai.request('http://localhost:3001')
        .post('/signup')
        .send({
            nick:'testuser123456',
            name:'testuser123456',
            email:'testuser123456',
            password:'testuser123456'
        })
        .end((error, res) => {
            expect(res).to.have.status(400)
            done();
        })
        
    })

    it('EMPTY DATA 400', done => {
        chai.request('http://localhost:3001')
        .post('/signup')
        .send({
            nick:'',
            name:'',
            email:'',
            password:''
        })
        .end((error, res) => {
            expect(res).to.have.status(400)
            done();
        })
        
    })

    it('CORRECT DATA 200', done => {
        chai.request('http://localhost:3001')
        .post('/signup')
        .send({
            nick:'testuser123456',
            name:'testuser123456',
            email:'testuser123456@gmail.com',
            password:'testuser123456'
        })
        .end((error, res) => {
            expect(res).to.have.status(200)
            done();
        })
        
    })
})