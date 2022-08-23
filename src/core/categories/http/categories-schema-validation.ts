export const createCategorySchema = {
  type: "object",
  properties: {
    name: {type: "string", minLength: 5},
    description: {type: "string",},
  },
  required: ["name"],
}

export const editCategorySchema = {
  type: "object",
  properties: {
    name: {type: "string", minLength: 5},
    description: {type: "string"},
  },
  required: [],
  additionalProperties: false
}
