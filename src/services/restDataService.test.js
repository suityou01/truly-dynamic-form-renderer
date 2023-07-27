const dummyRestAPI = 'https://dummyjson.com/products';
const RestDataService = require("./restDataService");
const RestDataCommand = require("../types/restDataCommand");
const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36';

describe('./src/services/restDataService', () => {
    it('should retrieve records from endpoint', async () => {

        const restDataCommandMock = {
            url: dummyRestAPI,
            method: 'GET',
            jsonPath: '',
            authorisation: ''
        }

        const rds = new RestDataService(restDataCommandMock);
        const result = await rds.do();
        //console.log(result);
        expect(result.products[0].id).toEqual(1);

    });

    it('should retrieve a subset of records rom the endpoint', async () => {

        const restDataCommandMock = new RestDataCommand({
            url: dummyRestAPI,
            method: 'GET',
            jsonPath: '$..[id,title]',
            authorisation: ''
        });


        const rds = new RestDataService(restDataCommandMock);
        const result = await rds.do();
        expect(result[0]).toEqual(1);
        expect(result[1]).toEqual('iPhone 9');
        //.log(result);
    });
});