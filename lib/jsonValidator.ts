import Ajv from "ajv"

const tourTemplateSchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    bookable: {
      type: "boolean"
    },
    form: {
      type: "array",
      items: [
        {
          anyOf: [
            {
              type: "array",
              items: {
                $ref: "#/definitions/formInput"
              }
            },
            {
              $ref: "#/definitions/formInput"
            }
          ]
        }
      ]
    },
    staff: {
      type: "object",
      patternProperties: {
        "^.*$": {
          type: "integer"
        }
      }
    },
    booking: {
      type: "object",
      properties: {
        slot_length_in_minutes: {
          type: "integer"
        },
        setup_slots: {
          type: "integer"
        },
        slots_per_person: {
          type: "object",
          patternProperties: {
            "^.*$": {
              type: "integer"
            }
          }
        }

      },
      get required(): string[] {
        return Object.keys(this.properties)
      },
    },
  },
  definitions: {
    formInput: {
      type: "object",
      additionalProperties: false,
      properties: {
        label: {
          type: "string"
        },
        placeholder: {
          type: "string"
        },
        required: {
          type: "boolean"
        }
      },
      get required(): string[] {
        return Object.keys(this.properties)
      },
    }
  },
  get required(): string[] {
    return Object.keys(this.properties)
  },
} as const

export const validateTourTemplate = new Ajv().compile(tourTemplateSchema)