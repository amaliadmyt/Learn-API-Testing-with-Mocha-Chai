const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')
const fs = require('fs')
const env = require('dotenv').config()

chai.use(chaiHttp)

const api = chai.request(process.env.BASE_URL)

describe('Create Stores', function(){
    let response = {}
    let store_id = null
    const jsonSchema = require('../schema/create.json')

    before((done) => {
        if(typeof(global.user_id) === 'undefined' || typeof(global.token) === 'undefined'){
            console.error('Global user id and token are undefined')
            done()
        }else{
            done()
        }
    });
    
    it('Should success create stores data with valid data', (done) =>{
        let name = 'Serena Store'
        let address = 'Panglima Sudirman 17'
        let description = 'Uji Coba Create Store'
        let status = 'active'

        api.post('api/v1/users/'+ global.user_id + '/stores')
        .set('Authorization', "Bearer" + global.token)
        .set('Content-Type', 'form-data')
        .field({
            name: name,
            address: address,
            description: description,
            status: status
        })
        .attach('cover_image', fs.readFileSync('./assets/images/ktp.jpg'), 'ktp.jpg')
        .end((err,res) => {
            response = res
            expect(response.status).to.equals(200)
            expect(response.body).to.be.jsonSchema(jsonSchema)
            store_id = response.body.data.id
            if(err){
                throw err
            }
            done()
        });
    });

        it('Should failed create stores data with empty mandatory', (done) =>{
            let name = 'Serena Store'
            let address = 'Panglima Sudirman 17'
            let description = 'Uji Coba Create Store'
            let status = ''
    
            api.post('api/v1/users/'+ global.user_id + '/stores')
            .set('Authorization', 'Bearer' + global.token)
            .set('Content-Type', 'form-data')
            .field({
                name: name,
                address: address,
                description: description,
                status: status
            })
            .end((err,res) => {
                response = res
                expect(response.status).to.equals(500);
                if(err){
                    throw err
                }
                done()
            });
        });

        after(function (done) {
            global.store_id = store_id
            done()
        });
});

