const TemplatePartRenderer = require("./templatePartRenderer");

const compiledObject = {
    file: "govukButton.yaml",
    meta: {
      _name: "GovukButton",
      _extends: "BaseFormElement",
      _macro_file: "govuk/components/button/macro.njk",
      _import: "govukButton",
      GovukButton: {
        properties: {
          api: {
            properties: {
              properties: {
                element: {
                  type: "string"
                },
                text: {
                  type: "string",
                  default: "Save and continue"
                },
                html: {
                  type: "string"
                },
                type: {
                  type: "string"
                },
                value: {
                  type: "string"
                },
                disabled: {
                  type: "boolean"
                },
                href: {
                  type: "string"
                },
                classes: {
                  type: "string"
                },
                attributes: {
                  type: "object",
                  patternProperties: {
                    "^\\w$": {
                      type: "string"
                    }
                  }
                },
                preventDoubleClick: {
                  type: "boolean"
                },
                isStartButton: {
                  type: "boolean"
                }
              },
              type: "object"
            }
          }
        },
        additionalProperties: false
      }
    },
    _templateObjectName: "",
    _extends: "GovukButton",
    _id: "99708c4e-c109-430a-bcb1-729766cc72e6",
    _part: "AButton",
    _content: {
      AButton: {
        id: "99708c4e-c109-430a-bcb1-729766cc72e6",
        extends: "GovukButton",
        api: {
          text: "Do the thing",
          name: "MyButton"
        }
      }
    }
};
  

describe('./src/renderers/templatePartRenderer', () => {
    let templatePartRenderer;
    beforeAll(()=> {
        templatePartRenderer = new TemplatePartRenderer();
        templatePartRenderer.setCompiledObject(compiledObject);
    });
    it('should render a part', () => {
        const rendered = templatePartRenderer.render();
        console.log(rendered);
    });
});