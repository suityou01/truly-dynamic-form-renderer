const METHODS = [
    'GET',
    'POST',
    'PUT'
]

const defatulUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36';

class RestDataCommand {
    _url;
    _method;
    _jsonPath;
    _authorisation;
    _userAgent;

    constructor({ url = '', method = 'GET', jsonPath = '', authorisation = '', userAgent = defatulUserAgent } = {}){
        this._url = url;
        this._method = method;
        this._jsonPath = jsonPath;
        this._authorisation = authorisation;
        this._userAgent = userAgent;
    }

    get url() {
        return this._url;
    }
    set url(value) {
        this._url = value;
    }

    get method() {
        return this._method;
    }
    set method(value) {
        if(!METHODS.includes(value)) return;
        this._method = value;
    }

    get jsonPath() {
        return this._jsonPath;
    }
    set jsonPath(value) {
        this._jsonPath = value;
    }

    set authorisation(value) {
        this._authorisation = value;
    }

    get userAgent(){
        return this._userAgent;
    }
    set userAgent(value) {
        this._userAgent = value;
    }

    toString(){
        return `
        {
            url: ${this._url},
            method: ${this._method},
            jsonPath: ${this._jsonPath},
            authorisation: ${this._authorisation},
            userAgent: ${this._userAgent}
        }
        `;
    }
}

module.exports = RestDataCommand;