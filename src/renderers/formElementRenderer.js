const BaseRenderer = require("./baseRenderer");

class FormElementRenderer extends BaseRenderer {
    
    constructor() {
        super();
    }
    getImport(compiledElement) {
        return compiledElement.meta._import;
    }
    getFrom(compiledElement) {
        return compiledElement.meta._macro_file;
    }
    renderImportLine(compiledElement){
        return `{% from "${this.getFrom(compiledElement)}" import ${this.getImport(compiledElement)} %}`;
    }
    render(compiledElement){

    }
}

module.exports = FormElementRenderer;