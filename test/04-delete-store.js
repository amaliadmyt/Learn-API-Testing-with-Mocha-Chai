const env = require('dotenv').config(),
        supertest = require('supertest'),
        api = supertest(process.env.BASE_URL),
        expect = require('chai').expect;

describe('Delete Store', function(){
    let response = {}
    const jsonSchema = require('../schema/delete.json')

    before((done) => {
        if(typeof(global.user_id) === 'undefined' || typeof(global.token) === 'undefined'){
            console.error('Global user id and token are undefined')
            done()
        }else if(typeof(global.store_id) === 'undefined'){
            console.error('Global store_id is undefined')
            done()
        }else{
            done()
        }
    });
    
    it('Should success delete one store based on store id', (done) =>{
        api.del('api/v1/users/'+ global.user_id + '/stores/' + global.store_id)
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

