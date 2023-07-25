class FormElementCompiler {
    constructor(){

    }
    compile(template, metadata){
        let compiled = {
            values: {}
        };
        Object.assign(compiled, metadata);
        Object.keys(metadata.meta._api).map(prop => {
            compiled.values[prop] = template.FormElement.values[prop];
        });
        return compiled;
    }
}

module.exports = FormElementCompiler;