# Engine Template
# Template Type

| property           | type   | description                                                                                                                             |
| ------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| templateObjectName | string | the name of top level key of the object this template object is encapsulating                                                           |
| extends            | string | the template or meta type this template inherits from                                                                                   |
| id                 | string | the template id which should be a uuid                                                                                                  |
| part               | string | the name of the top level key of the object this template object is encpsulating. A template cannot be a top level template and a part. |
| content            | object | the api specification that describes the interface for this gds component to which this meta class relates                              |
| parts              | array  | a top level template can be composed of template parts                                                                                  |

# An example template part

This template part represents a button. (Example can be found in /templates/examples/intrinsics/govukButton.yaml)

## Raw template file

```yaml
AButton:
  id: 99708c4e-c109-430a-bcb1-729766cc72e6
  extends: GovukButton
  api:
    text: Do the thing

```

Once ingested the resulting template object will look like this (represented by the template key in the top level object)

```javascript
{
    file: "govukButton.yaml",
    template: {
        templateObjectName: "",
        extends: "GovukButton",
        id: "99708c4e-c109-430a-bcb1-729766cc72e6",
        part: "AButton",
        content: {
            AButton: {
            id: "99708c4e-c109-430a-bcb1-729766cc72e6",
            extends: "GovukButton",
                api: {
                    text: "Do the thing"
                }
            }
        },
    parts: []
  }
}
```

NB The top level object is a pointer object that encapsulates the template.

