const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../')
const models = require('../models/index')
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwt_config');

const expect = chai.expect;

describe('SUBSCRIBE', () => {
    let testToken = '';

    before(async () => {
        const testUser = await models.User.create({
            id:503,
            nick:'testuser123456',
            name:'testuser123456',
            email:'testuser123456@gmail.com',
            password:'testuser123456'    
        });
        testToken = await jwt.sign({id:503}, jwtSecret.secret, {expiresIn: jwtSecret.tokenLife})

        const testUser2 = await models.User.create({
            id:504,
            nick:'testuser1234567',
            name:'testuser1234567',
            email:'testuser1234567@gmail.com',
            password:'testuser1234567'    
        });
    })

    after(done => {
        models.User.destroy({
            where:{
                nick:'testuser123456'
            }
        })

        models.User.destroy({
            where:{
                id:504
            }
        })
        done();
    })

    it('ADD FRIEND 200', done => {
        chai.request('http://localhost:3001')
        .post('/addfriend/504')
        .set('Authorization', `Bearer ${testToken}`)
        .end((error, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })

    it('ADD FRIEND INCORRECT ID 404', done => {
        chai.request('http://localhost:3001')
        .post('/addfriend')
        .set('Authorization', `Bearer ${testToken}`)
        .end((error, res) => {
            expect(res).to.have.status(404);
            done();
        })
    })

    it('GET ALL SUBSCRIBE 200', done => {
        chai.request('http://localhost:3001')
        .get('/allfriends')
        .set('Authorization', `Bearer ${testToken}`)
        .end((error, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })

    it('GET ALL SUBSCRIBE INVALID TOKEN 401', done => {
        chai.request('http://localhost:3001')
        .get('/allfriends')
        .set('Authorization', 'invalid token')
        .end((error, res) => {
            expect(res).to.have.status(401);
            done();
        })
    })
})