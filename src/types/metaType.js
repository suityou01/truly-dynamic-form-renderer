class MetaData {
    _name;
    _extends;
    _macro_file;
    _import;

    constructor() {

    }

    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }

    get extends() {
        return this._extends;
    }
    set extends(value) {
        this._extends = value;
    }

    get macroFile() {
        return this._macro_file;
    }
    set macroFile(value) {
        this._macro_file = value;
    }

    get import() {
        return this._import;
    }
    set import(value) {
        this._import = value;
    }

    toString() {
        return `
        {
            name: ${this._name},
            extends: ${this._extends},
            macroFile: ${this._macro_file},
            import: ${this._import},
        }`;
    }
}

module.exports = MetaData;