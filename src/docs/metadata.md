# Metadata

## What is metadata?

Metadata is data about other data that provides information about that data but not the content of the data itself.

For example consider the following piece of JSON

```json
{
    "type": "aeroplane",
    "make": "SAAB",
    "model": "340",
    "speed": 500,
    "range": 2500,
    "undercariages": 1,
    "engines": 2,
    "propulsion" : "turboprop",
}
```

Just by looking at the data it's possible to infer what the data is about, mostly. However if you look closer some questions come to mind.

Is the type always "aeroplane"?
What are the different makes that are valid for this data set?
The speed is 500, but what are the units?
Similarly, what are the units for the range?
Is there a minimum and miximum number of engines?
What different types of propulsion are there?

So let's create some answers for those questions. For our example here we will say, for the sake of argument :

Our dataset can store aeroplanes, gliders and helicopters.
There is no restriction on make or model. They can be anything you like.
The speed is in kilometres per hour, and will always be this.
The range is in kilometers and, and will always be this.
The number of undercarriages should always be 1.
The minimum numder of engines for anything that is not a glider is 1.
A glider must have no engines.
The propulsion can be turboprop, turbofan or turbojet for aeroplanes and can be turboshaft or electric for helicopters.

We now have some rules that we can apply to our data, and we could use a schema definition to enforce these.

```javascript
{
    aircraft: {
        type: object,
        properties: {
            type: {
                type: string,
                enum: ["aeroplane", "helicopter", "glider"]
            },
            make: {
                type: string,
            },
            model: {
                type: string,
            },
            speed: {
                type: integer
            },
            range: {
                type: integer
            },
            undercarriages: {
                type: integer,
                const: 1
            },
            engines: {
                type: integer,
                minimum: 0
            },
            propulsion: {
                type: string,
                enum: ['turboprop', 'turbofan', 'turbojet', 'turboshaft', 'electric']
            }
        }
    }
}
```

It's better but it's still not quite right. For example the numer of engines can be 0 for a glider but you wouldn't want it to be 0 for the other 2 types of aircraft.
Similarly the propulsion types are too general. 

What we need here is to break this schema out into different schemas such as :

Glider
FixedWing
Helicopter

If we did do this we would end up with a lot of repetion in our schema definitions, which is annoying.

So our schema definitions are ok, but are not stricly a full range of meta data. For this we would need to think in more abstract terms.

```javascript
const AircraftMetadata = {
   type: object,
    properties: {
        type: {
            type: 'string',
        },
        make: {
            type: 'string',
        },
        model: {
            type: 'string',
        },
        speed: {
            type: 'integer'
        },
        range: {
            type: 'integer'
        },
        undercarriages: {
            type: 'integer',
            const: 1
        },
        engines: {
            type: 'integer',
        },
        propulsion: {
            type: 'string',
        }
    }
}
```

This object literal describes the abstraction of an aircraft in terms we would think of in an object oriented design. As we inherit from this we can diversify and add specific.

Let's look at what our definition of a glider may look like

```javascript
const Glider = {
    _extends: AircraftMetadata,
    engines: {
        const: 0
    },
    propulsion: {
        const 'none'
    }
}
```

So in our example here the Glider object literal defines a property called '_extends' that demonstrates to us that it should inherit the values from the AircraftMetadata object.

Javascript doesn't natively support object inheritance per se, it can be achieved with classes of course. Imagine for now we have some code that can interpret these two objects and link them together so that our combined output for Glider would look like this :

```javascript
const Glider = {
    type: object,
    properties: {
        type: {
            type: 'string',
        },
        make: {
            type: 'string',
        },
        model: {
            type: 'string',
        },
        speed: {
            type: 'integer'
        },
        range: {
            type: 'integer'
        },
        undercarriages: {
            type: 'integer',
            const: 1
        },
        engines: {
            type: 'integer',
            const: 0
        },
        propulsion: {
            type: 'string',
            const: 'none'
        }
    }
}
```

In this rather contrived example we have seen what meta data is and how to define it in terms of a schema, but this is not all.

Metadata can define descriptions of the data, specific behaviours, provide data examples