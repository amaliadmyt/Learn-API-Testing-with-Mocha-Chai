const env = require('dotenv').config(),
        supertest = require('supertest'),
        api = supertest(process.env.BASE_URL),
        expect = require('chai').expect;

describe('Get Store', function(){
    let response = {}
    const jsonSchema = require('../schema/get.json')

    before((done) => {
        if(typeof(global.user_id) === 'undefined' || typeof(global.token) === 'undefined'){
            console.error('Global user id and token are undefined')
            done()
        }else{
            done()
        }
    });
    
    it('Should show all store in this user id', (done) =>{
        api.get('api/v1/users/'+ global.user_id + '/stores')
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

