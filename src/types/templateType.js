class Template {
    _templateObjectName = "";
    _extends = "";
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
}

module.exports = Template;