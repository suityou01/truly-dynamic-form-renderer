const BaseRenderer = require("./baseRenderer");

class TemplatePartRenderer extends BaseRenderer {
    _compiledObject;
    constructor() {
        super();
    }
    setCompiledObject(compiledObject){
        this._compiledObject = compiledObject;
        return this;
    }
    renderImports(){
        return `{% from "${this._compiledObject.meta._macro_file}" import ${this._compiledObject.meta._import} %}`
    }
    renderContent(){
        return `{{ ${this._compiledObject.meta._import}({
    ${JSON.stringify(this._compiledObject._content.AButton.api).replace("{", "").replace("}", "")}
}) }}`;
    }
    render() {
        return {
            imports: this.renderImports(),
            content: this.renderContent()
        }
    }
}

module.exports = TemplatePartRenderer;