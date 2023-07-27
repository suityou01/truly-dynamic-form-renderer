class Template {
    _name;
    _id;
    _part;

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
}

module.exports = Template;