const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../')
const models = require('../models/index')
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwt_config');

const expect = chai.expect;
const invalidToken = 'invalid token'

chai.use(chaiHttp)

describe('COMMENTS', () => {
    let testToken = '';

    before(async () => {
        const testUser = await models.User.create({
            id:505,
            nick:'testuser123456',
            name:'testuser123456',
            email:'testuser123456@gmail.com',
            password:'testuser123456'    
        });
        testToken = await jwt.sign({id:505}, jwtSecret.secret, {expiresIn: jwtSecret.tokenLife})

        const testNote = await models.ToDo.create({
            id:505,
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
                id:505
            }
        })
        done();
    })

    it('ADD COMMENT 200', done => {
        chai.request('http://localhost:3001')
        .post('/addcomment/505')
        .set({ "Authorization": `Bearer ${testToken}` })
        .send({
            comment:'comment for testing',
            UserId:505,
            ToDoId:505
        })
        .end((error, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })

    it('ADD COMMENT INCORRECT ID 404', done => {
        chai.request('http://localhost:3001')
        .post('/addcomment')
        .set({ "Authorization": `Bearer ${testToken}` })
        .send({
            comment:'comment for testing',
            UserId:505,
            ToDoId:505
        })
        .end((error, res) => {
            expect(res).to.have.status(404);
            done();
        })
    })
})