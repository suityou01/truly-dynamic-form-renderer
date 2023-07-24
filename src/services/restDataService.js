const axios = require('axios').default;
const {JSONPath} = require('jsonpath-plus');

class RestDataService {
    _command = {
        url: '',
        method: '',
        jsonPath: '',
        authorisation: '',
        userAgent: ''
    };
    constructor(command) {
        this._command = command;
    }
    async do () {
        return new Promise((resolve, reject) => {

            axios({
                headers: {
                    'User-Agent': this._command.userAgent,
                    'Content-Type': 'text/html',
                    'Authorization': this._command.authorisation
                },
                method: this._command.method,
                url: this._command.url
            })
            .then((response) => {
                if(this._command.jsonPath) {
                    const subSet = JSONPath({path: this._command.jsonPath, json: response.data});
                    resolve(subSet); 
                }
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });

        });
    }
}

module.exports = RestDataService;