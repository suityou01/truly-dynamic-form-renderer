const { getKeyPointerFromObject,
    getValueFromObject,
    setValueOnObject,
    deleteKeyFromObject,
    recurseObjectProperties,
    createKeyOnObject,
    mergeKeys,
    mergeObjects
} = require('./object');


const objectA = {
    firstName: "Charlie",
    lastName: "Farley",
    address: {
        line1: "1 Dunghill Mansions",
        line2: "Dungheaps",
        town: "Putney",
        postcode: "SW15 9HQ",
        coordinates: {
            longlat: {
                longitude: `0°13'6"W`,
                latitude: `51°27'37"N`
            },
            os: {
                eastings: "523857",
                northings: "175007",
                grid: "TQ238750"   
            }
        }
    }
}

const objectB = {
    id: "9a8f8c39-348c-42fd-8038-5dbe1f4bccce",
    firstName: "Charlie",
    lastName: "Farley",
    address: {
        line1: "60 Acacia Avenue",
        line2: "",
        town: "Wandsworth",
        postcode: "SW11 4GH",
        coordinates: {
            longlat: {
                longitude: `0°9'23"W`,
                latitude: `51°28'29"N`
            },
            os: {
                eastings: "528119",
                northings: "176696",
                grid: "TQ281766"   
            }
        }
    }
}

describe('../lib/object', () => {
    it('should get a key pointer from an object using a path', () => {
        const path = 'address.coordinates.longlat';
        const keyPointer = getKeyPointerFromObject(objectA, path);
        expect(keyPointer).toEqual(objectA.address.coordinates.longlat);
    });
    it('should create a keymap of a nested object', () => {
        const keyMap = recurseObjectProperties(null, objectA);
        expect(keyMap).toEqual([
            'firstName',
            'lastName',
            'address',
            'address.line1',
            'address.line2',
            'address.town',
            'address.postcode',
            'address.coordinates',
            'address.coordinates.longlat',
            'address.coordinates.longlat.longitude',
            'address.coordinates.longlat.latitude',
            'address.coordinates.os',
            'address.coordinates.os.eastings',
            'address.coordinates.os.northings',
            'address.coordinates.os.grid'
          ]);
    });
    it('should create a keymap of a nested object with a parent prefix', () => {
        const keyMap = recurseObjectProperties("toplevel", objectA);
        expect(keyMap).toEqual([
            'toplevel.firstName',
            'toplevel.lastName',
            'toplevel.address',
            'toplevel.address.line1',
            'toplevel.address.line2',
            'toplevel.address.town',
            'toplevel.address.postcode',
            'toplevel.address.coordinates',
            'toplevel.address.coordinates.longlat',
            'toplevel.address.coordinates.longlat.longitude',
            'toplevel.address.coordinates.longlat.latitude',
            'toplevel.address.coordinates.os',
            'toplevel.address.coordinates.os.eastings',
            'toplevel.address.coordinates.os.northings',
            'toplevel.address.coordinates.os.grid'
          ]);
    });
    it('should get a top level value from an object', () => {
        let x = getValueFromObject(objectA, 'firstName');
        expect(x).toEqual(objectA.firstName);
    });
    it('should get a bottom level value from an object', () => {
        let x = getValueFromObject(objectA, 'address.coordinates.os.eastings');
        expect(x).toEqual(objectA.address.coordinates.os.eastings);
    });
    it('should set a top level value on an object', () => {
        setValueOnObject(objectA, 'firstName', 'Charles');
        expect(objectA.firstName).toEqual('Charles');
        setValueOnObject(objectA, 'firstName', 'Charlie');
    });
    it('should set a bottom level value on an object', () => {
        setValueOnObject(objectA, 'address.coordinates.os.eastings', 523858);
        expect(objectA.address.coordinates.os.eastings).toEqual(523858);
    });
    it('should delete a top level key from an object', () => {
        const x = deleteKeyFromObject(objectA, 'firstName');
        expect(x.hasOwnProperty('firstName')).toEqual(false);
    });
    it('should delete a bottom level key from an object', () => {
        const x = deleteKeyFromObject(objectA, 'address.coordinates.os.eastings');
        expect(x.address.coordinates.os.hasOwnProperty('eastings')).toEqual(false);
    });
    it('should create a top level key on an object', () => {
        const x = createKeyOnObject(objectA, 'shoeSize', 9);
        expect(x).toEqual(9);
        expect(objectA.shoeSize).toEqual(9);
    });
    it('should create a bottom level key on an object', () => {
        const x = createKeyOnObject(objectA, 'address.coordinates.os.westings', 9);
        expect(x).toEqual(9);
        expect(objectA.address.coordinates.os.westings).toEqual(9);
    });
    it('should merge top level keys', () => {
        let x = mergeKeys(objectA, 'firstName', 'lastName', 'individual' );
        expect(x.hasOwnProperty('firstName')).toEqual(false);
        expect(x.hasOwnProperty('lastName')).toEqual(false);
        expect(x.hasOwnProperty('individual')).toEqual(true);
        expect(x.individual.hasOwnProperty('firstName')).toEqual(true);
        expect(x.individual.hasOwnProperty('lastName')).toEqual(true);
        expect(x.individual.firstName).toEqual('Charlie');
        expect(x.individual.lastName).toEqual('Farley');
    });
    it('should merge top level keys into a nested key', () => {
        let x = mergeKeys(objectA, 'firstName', 'lastName', 'subject.individuals.personA');
        expect(x.hasOwnProperty('firstName')).toEqual(false);
        expect(x.hasOwnProperty('lastName')).toEqual(false);
        expect(x.hasOwnProperty('subject')).toEqual(true);
        expect(x.subject.hasOwnProperty('individuals')).toEqual(true);
        expect(x.subject.individuals.hasOwnProperty('personA')).toEqual(true);
        expect(x.subject.individuals.personA.hasOwnProperty('lastName')).toEqual(true);
        expect(x.subject.individuals.personA.firstName).toEqual('Charlie');
        expect(x.subject.individuals.personA.lastName).toEqual('Farley');
    });
    it('should merge nested keys', () => {
        let x = mergeKeys(objectA, 'address.coordinates.longlat', 'address.coordinates.os', 'address.coordinates.longlat', false);
        expect(x.address.coordinates.longlat.hasOwnProperty('eastings')).toEqual(true);
        expect(x.address.coordinates.longlat.eastings).toEqual(objectA.address.coordinates.os.eastings);
        expect(x.address.coordinates.longlat.hasOwnProperty('northings')).toEqual(true);
        expect(x.address.coordinates.longlat.northings).toEqual(objectA.address.coordinates.os.northings);
        expect(x.address.coordinates.longlat.hasOwnProperty('grid')).toEqual(true);
        expect(x.address.coordinates.longlat.grid).toEqual(objectA.address.coordinates.os.grid);
    });
    it('should merge two objects', () => {
        const merged = mergeObjects(objectA, objectB);
        expect(merged.firstName).toEqual(objectA.firstName);
    });
});