export const editUserSchema = {
  type: "object",
  properties: {
    name: {type: "string", minLength: 5},
    email: {type: "string", format: "email"},
  },
  required: [],
}

export const changePasswordSchema = {
  type: "object",
  properties: {
    oldPassword: {type: "string"},
    newPassword: {type: "string", minLength: 5},
  },
  required: ["oldPassword", "newPassword"],
  additionalProperties: false
}
