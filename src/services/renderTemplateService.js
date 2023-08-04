const Linker = require("../linker/linker");

class RenderTemplateService {
    _linker;
    constructor(linker = undefined) {
        if(linker){
            this._linker = linker;
            return;
        }
        this._linker = new Linker();
    }
    render(template) {
        const linkedTemplate = this._linker.setLinkableObject(template).link();
        console.log(JSON.stringify(linkedTemplate, null, 2));
    }
}

module.exports = RenderTemplateService;