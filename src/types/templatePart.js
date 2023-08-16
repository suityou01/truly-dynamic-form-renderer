class TemplatePart {
    _extends = "";
    _page = "";
    _section = "";
    _template = "";
    _name = "";
    _id = "";
    _part = "";
    _content;
    _parts = [];

    get extends() {
        return this._extends;
    }
    set extends(value) {
        this._extends = value;
    }

    get page() {
        return this._page;
    }
    set page(value) {
        this._page = value;
    }

    get section() {
        return this._section;
    }
    set section(value) {
        this._section = value;
    }

    get template() {
        return this._template;
    }
    set template(value) {
        this._template = value;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }

    get part() {
        return this._part;
    }
    set part(value){
        this._part = value;
    }

    get content() {
        return this._content;
    }
    set content(value) {
        this._content = value;
    }

    get parts() {
        return this._parts;
    }

    toString(){
        return JSON.stringify({
            extends: this.extends,
            name: this.name,
            id: this.id,
            part: this.part,
            content: this.content,
            parts: this.parts
        }, null, 2);
    }
}

module.exports = TemplatePart;