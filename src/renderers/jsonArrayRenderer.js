const BaseRenderer = require("./baseRenderer.js")

class JSONArrayRenderer extends BaseRenderer{
    _json;
    _renderSpec;
    _instrinsicFunctions;
    constructor(json, renderspec, intrinsicFunctions) {
        super();
        this._json = json;
        this._renderSpec = renderspec;
        this._instrinsicFunctions = intrinsicFunctions;
    }

    toString(){
        return `
            {
                renderspec: ${this._renderSpec}
            }
        `
    }
    render(){
        this._instrinsicFunctions.setState(this._json);
        let result = {};
        Object.keys(this._renderSpec).map((k) => {
            const renderSpec = this._renderSpec[k];
            let items = this._instrinsicFunctions
                .setRefExpression(renderSpec)
                .execute();
            result[k] = items;
        });
        return result;
    }
}

module.exports = JSONArrayRenderer;