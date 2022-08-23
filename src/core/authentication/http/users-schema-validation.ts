export const userSchema = {
  type: "object",
  properties: {
    name: {type: "string", minLength: 5},
    email: {type: "string", format: "email"},
    password: {type: "string", minLength: 5},
  },
  required: ["name", "email", "password"],
  additionalProperties: false
}

export const signInSchema = {
  type: "object",
  properties: {
    email: {type: "string"},
    password: {type: "string"},
  },
  required: ["email", "password"],
  additionalProperties: false
}