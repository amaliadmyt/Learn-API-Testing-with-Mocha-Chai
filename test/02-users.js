const env = require('dotenv').config(),
        supertest = require('supertest'),
        api = supertest(process.env.BASE_URL),
        chai = require('chai'),
        expect = require('chai').expect;

chai.use(require('chai-json-schema'))

describe('User Profile', function(){
    let response = {}
    const jsonSchema = require('../schema/profile.json')

    before((done) => {
        if(typeof(global.user_id) === 'undefined' || typeof(global.token) === 'undefined'){
            console.error('Global user id and token are undefined')
            done()
        }else{
            done()
        }
    });
    
    it('Should show all his/him profile', (done) =>{
        api.get('api/v1/users/'+ global.user_id)
        .set('Authorization', 'Bearer' + global.token)
        .end((err,res) => {
            response = res
            expect(response.status).to.equals(200)
            expect(response.body).to.be.jsonSchema(jsonSchema)
            if(err){
                throw err
            }
            done()
        });
    });
});

