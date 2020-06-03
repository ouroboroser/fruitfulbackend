const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../')
const models = require('../models/index')
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwt_config');

const expect = chai.expect;

chai.use(chaiHttp)

describe('jwt', () => {
    let token = '';

    before(async () => {
        await models.User.create({
            id:500,
            nick:'testuser123',
            name:'testuser123',
            email:'testuser123@gmail.com',
            password:'testuser123'    
        });
        token = await jwt.sign({id:500}, jwtSecret.secret, {expiresIn: jwtSecret.tokenLife})
    })

    after(done => {
        models.User.destroy({
            where:{
                nick:'testuser123'
            }
        })
        done();
    })

    it('INVALID TOKEN 401', done => {
        chai.request('http://localhost:3001')
        .post('/addtodo')
        .set("Authorization", "invalid token")
        .end((error, res) => {
            expect(res).to.have.status(401);
            done();
        })
    })

    // DONE
    
    it('CURRENT USER 200', done => {
        chai.request('http://localhost:3001')
        .get('/getcurrentuser')
        .set({ "Authorization": `Bearer ${token}` })
        .end((error, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })
    
    it('ADD TO DO 200', done => {
        chai.request('http://localhost:3001')
        .post('/addtodo')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            text:'some text for testing',
            description:'some description for testing ',
            UserId:500
        })
        .end((error, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })
})