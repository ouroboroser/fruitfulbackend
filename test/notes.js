const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../')
const models = require('../models/index')
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwt_config');

const expect = chai.expect;
const invalidToken = 'invalid token'

chai.use(chaiHttp)

describe('NOTES FUNCTIONS', () => {
    let testToken = '';

    before(async () => {
        const testUser = await models.User.create({
            id:501,
            nick:'testuser123456',
            name:'testuser123456',
            email:'testuser123456@gmail.com',
            password:'testuser123456'    
        });
        testToken = await jwt.sign({id:501}, jwtSecret.secret, {expiresIn: jwtSecret.tokenLife})

        const testNote = await models.ToDo.create({
            id:501,
            text:'test note',
            description:'some description for test'
        })
    })

    after(done => {
        models.User.destroy({
            where:{
                nick:'testuser123456'
            }
        })

        models.ToDo.destroy({
            where:{
                id:501
            }
        })
        done();
    })


    it('ADD TO DO 200', done => {
        chai.request('http://localhost:3001')
        .post('/addtodo')
        .set({ "Authorization": `Bearer ${testToken}` })
        .send({
            text:'some text for testing',
            description:'some description for testing ',
            UserId:501
        })
        .end((error, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })

    it('UPDATE STATUS TODO 200', done => {
        chai.request('http://localhost:3001')
        .get('/update/501')
        .set('Authorization', `Bearer ${testToken}`)
        .end((error, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })

    it('UPDATE STATUS TODO INCORRECT ID 404', done => {
        chai.request('http://localhost:3001')
        .get('/update')
        .set('Authorization', `Bearer ${testToken}`)
        .end((error, res) => {
            expect(res).to.have.status(404);
            done();
        })
    })

    it('DELETE TODO 200', done => {
        chai.request('http://localhost:3001')
        .get('/delete/501')
        .set('Authorization', `Bearer ${testToken}`)
        .end((error, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })

    it('DELETE TODO INCORRECT ID 404', done => {
        chai.request('http://localhost:3001')
        .get('/delete')
        .set('Authorization', `Bearer ${testToken}`)
        .end((error, res) => {
            expect(res).to.have.status(404);
            done();
        })
    })

    it('GET TODO STATISTICS 200', done => {
        chai.request('http://localhost:3001')
        .get('/getstatiscs')
        .set('Authorization', `Bearer ${testToken}`)
        .end((error, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })

    it('INVALID ADD TO DO 401', done => {
        chai.request('http://localhost:3001')
        .post('/addtodo')
        .set({ "Authorization": `Bearer ${invalidToken}` })
        .send({
            text:'some text for testing',
            description:'some description for testing ',
            UserId:95
        })
        .end((error, res) => {
            expect(res).to.have.status(401);
            done();
        })
    })
})