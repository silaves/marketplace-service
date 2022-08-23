export const createProductSchema = {
  type: "object",
  properties: {
    name: {type: "string", minLength: 5},
    description: {type: "string"},
    quantity: {type: "integer"},
    categoryId: {type: "integer"},
  },
  required: ["name", "quantity", "categoryId"],
}

export const editProductSchema = {
  type: "object",
  properties: {
    name: {type: "string", minLength: 5},
    description: {type: "string"},
    quantity: {type: "integer"},
    categoryId: {type: "integer"},
  },
  required: [],
}
