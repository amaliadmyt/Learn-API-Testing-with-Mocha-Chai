const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')
const env = require('dotenv').config()

chai.use(chaiHttp)

const api = chai.request(process.env.BASE_URL)

describe('Login Test', function(){
    let response = {}
    let token = null
    let user_id = null

    it('Should Success login with valid data credentials', function(done){
        let email = process.env.APP_EMAIL
        let password = process.env.APP_PASSWORD
        let username = process.env.APP_USERNAME

        api.post('api/v1/login')
        .set('Content-Type', 'application/json')
        .send({
            email: email,
            password: password
        })
        .end(function(err, res){
            response = res
            expect(response.status).to.equals(200)
            expect(response.body.data.email).to.equals(email)
            expect(response.body.data.name).to.equals(username)
            token = response.body.data.token
            user_id = response.body.data.id
            done()
        });
    });
    
    it('Should Login Failed with invalid data credentials', function(done){
        let email = process.env.APP_EMAIL
        let password = 'wrong' + process.env.APP_PASSWORD

        api.post('api/v1/login')
        .set('Content-Type', 'application/json')
        .send({
            email: email,
            password: password
        })
        .end(function(err, res){
            response = res
            expect(response.status).to.equals(422)
            done()
        });
    });

    after(function (done) {
        global.token = token
        global.user_id = user_id
        // console.log(global.token);
        // console.log(global.user_id);
        done()
    });
});
