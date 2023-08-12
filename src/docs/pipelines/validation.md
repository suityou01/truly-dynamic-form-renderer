# Post Validation

## Post Validation Pipeline

Request > MultipartStream > Compile > Validation

## Example Template

```yaml
Template:
  LPAQuestionnaire:
    name: LPA Questionnaire
    id: ee9ec28b-df53-4de7-ac63-9495968ac984

---

Page:
  id: 8b148a5d-d37e-414a-a71b-08017681b0d0
  template: LPAQuestionnaire
  title: Enter email

---

LPAEmail:
  id: 228eee93-db3e-42be-8c5b-9c24acdfde58
  extends: Email
  page: Page
  label:
    text: Enter your email address
    isPageHeading: true
  hint: We'll send an access code to this address, if you have an account

```

## The parent template
```yaml
Email:
  id: a36b3b33-a94b-4c36-81ca-674cb6dc9565
  extends: GovukInput
  api:
    inputmode: email
    value:
      pattern: "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
      x-errorMessage: Enter an email address in the correct format, like name@example.com
```

## The grandparent template
```yaml
$id: /govuk/components/input
type: object
properties:
  GovukInput:
    type: object
    properties:
      extends: 
        type: string
        const: BaseFormElement
      macro_file: 
        type: string
        const: govuk/components/input/macro.njk
      import:
        type: string
        const: govukInput
      api:
        type: object
        properties:
          type:
            type: string
          inputmode:
            type: string
            enum:
              - none
              - text
              - decimal
              - numeric
              - tel
              - search
              - email
              - url
          value:
            type: string
          disabled:
            type: boolean
          describedBy:
            type: string
          label:
            type: object
            properties:
              text: 
                type: string
                default: What is the name of the event?
              classes:
                type: string
                default: govuk-label--l
              isPageHeading: 
                type: boolean
                default: true
          hint:
            type: object
            properties:
              text:
                type: string
              html:
                type: string
              id:
                type: string
              classes:
                type: string
              attributes:
                type: object
                patternProperties:
                  "^.*$":
                    type: string
    additionalProperties: false              
```

## Example Post Data

```
----------------------------644738440810165337574292
Content-Disposition: form-data; name="LPAEmail"

Hello
----------------------------644738440810165337574292--
```

## Output of multipart stream

```
{
    fields: [{
        name: 'LPAEmail',
        type: 'field',
        value: 'Hello'
    }]
}
```

## Output of compile stream
```javascript
{
    fields: [{
        name: 'LPAEmail',
        type: 'field',
        value: 'Hello',
        meta: {
            type: string,
            pattern: "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
            x-errorMessage: "Enter an email address in the correct format, like name@example.com"
        }
    }]
}
```

## Output of validation stream
```javascript
{
    fields: [{
        name: 'LPAEmail',
        type: 'field',
        value: 'Hello',
        meta: {
            type: string,
            pattern: "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
            x-errorMessage: "Enter an email address in the correct format, like name@example.com"
        },
        valid: false
    }]
}
```
