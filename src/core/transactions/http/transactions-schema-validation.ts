export const detailTransactionSchema = {
  type: "object",
  properties: {
    productId: {type: "integer"},
    quantity: {type: "integer"},
  },
  required: ["productId", "quantity"],
}

export const createTransactionSchema = {
  type: "object",
  properties: {
    details: {
      type: "array",
      items: {
        type: "object",
        properties: {
          productId: {type: "integer"},
          quantity: {type: "integer"},
        },
        required: ["productId", "quantity"],
      }
    },
  },
  required: ["details"],
}

export const editTransactionSchema = {
  type: "object",
  properties: {
    name: {type: "string", minLength: 5},
    description: {type: "string"},
    quantity: {type: "integer"},
  },
  required: [],
  additionalProperties: false
}
