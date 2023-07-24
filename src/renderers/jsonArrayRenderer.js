const BaseRenderer = require("./baseRenderer.js")

class JSONArrayRenderer extends BaseRenderer{
    _json;
    _renderSpec;
    constructor(json, renderspec) {
        super();
        this._json = json;
        this._renderSpec = renderspec;
    }

    toString(){
        return `
            {
                renderspec: ${this._renderSpec}
            }
        `
    }
    render(){
        return this._json.map((item => {
            Object.keys(this._renderSpec).map((k) => {
                const renderSpec = this._renderSpec[k];
                console.log(renderSpec);
            });
        }));
    }
}

module.exports = JSONArrayRenderer;