# Engine Meta Data

## Metadata Type

| property   | type    | description                                                                                                |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| name       | string  | the name of the meta class                                                                                 |
| extends    | string  | the meta class this meta class inherits from                                                               |
| macro_file | string  | the name of the gds macro file to which this meta class relates                                            |
| import     | string  | the name of the gds import from the macro file to which this meta class relates                            |
| api        | objecet | the api specification that describes the interface for this gds component to which this meta class relates |


This Metadata type is used by the Metadata Factory upon ingestion of the meta data files which reside in the ./meta folder and and subfolders therein.

## An example of a meta data file

```yaml
$id: /govuk/components/govukButton
type: object
properties:
  GovukButton:
    type: object
    properties:
      extends: 
        type: string
        const: BaseFormElement
      macro_file: 
        type: string
        const: govuk/components/button/macro.njk
      import: 
        type: string
        const: govukButton
      api:
        element:
          type: string
        text: 
          type: string
          default: Save and continue
        html:
          type: string
        type:
          type: string
        value:
          type: string
        disabled:
          type: boolean
        href:
          type: string
        classes:
          type: string
        attributes:
            type: object
            patternProperties:
                "\S\w*":
                type: string
        preventDoubleClick:
          type: boolean
        isStartButton:
          type: boolean
    additionalProperties: false
```

This inherits from 

```yaml
$id: '/abstractions/forms/baseformelement'
type: object
properties:
  BaseFormElement:
    type: object
    properties:
      api:
        type: object
        properties:
            id: 
            type: string
            name:
            type: string
```

Once ingested the resulting object created by the factory looks like this

```javascript
 {
    "_name": "GovukButton",
    "_extends": "BaseFormElement",
    "_macro_file": "govuk/components/button/macro.njk",
    "_import": "govukButton",
    "GovukButton": {
        "properties": {
            "api": {
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "element": {
                        "type": "string"
                    },
                    "text": {
                        "type": "string",
                        "default": "Save and continue"
                    },
                    "html": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string"
                    },
                    "disabled": {
                        "type": "boolean"
                    },
                    "href": {
                        "type": "string"
                    },
                    "classes": {
                        "type": "string"
                    },
                    "attributes": {
                        "type": "object",
                        "patternProperties": {
                            "\S\w*": {
                                "type": "string"
                            }
                        }
                    },
                    "preventDoubleClick": {
                        "type": "boolean"
                    },
                    "isStartButton": {
                        "type": "boolean"
                    }
                }
            }
        },
        "additionalProperties": false
    }
}
```

Notice how the properties "id" and "name" are inherited from BaseFormElement.

Only single inheritance is supported but inheritance can span multiple levels forming an inheritance hierarchy called a "chain".

