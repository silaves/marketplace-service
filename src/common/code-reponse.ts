export const codeResponse = {
  RETRIEVE_SUCCESSFUL: 1,
  OBJECT_CREATED_SUCCESSFULLY: 2,
  FAILED_RETRIEVE: 3,
  FAILED_OBJECT_CREATED: 4,
  NOT_AUTHORIZED: 5,
  ALREADY_EXIST_EMAIL: 6,
  ALREADY_EXIST_USERNAME: 7,
  OBJECT_NOT_FOUND: 8,
  NOT_AUTHENTICATE: 9,
  INCORRECT_CREDENTIALS: 10,
  FAILED_SCHEMA_VALIDATION: 11,
  SUCCESSFUL_DELETED: 12,
  ALREADY_EXIST_OBJECT: 13,
  OBJECT_UPDATED_SUCCESSFULLY: 14,
  FAILED_TRANSACTION_VALIDATION: 15,
}

const detailResponse = [
  {
    code: codeResponse.RETRIEVE_SUCCESSFUL,
    message: "Data successfully retrieved",
  },
  {
    code: codeResponse.OBJECT_CREATED_SUCCESSFULLY,
    message: "Object successfully created",
  },
  {
    code: codeResponse.NOT_AUTHORIZED,
    message: "Not Allowed",
  },
  {
    code: codeResponse.FAILED_OBJECT_CREATED,
    message: "Object could not be created",
  },
  {
    code: codeResponse.FAILED_RETRIEVE,
    message: "Data could not be retrieved",
  },
  {
    code: codeResponse.ALREADY_EXIST_EMAIL,
    message: "Email is already in use",
  },
  {
    code: codeResponse.ALREADY_EXIST_USERNAME,
    message: "Username is already in use",
  },
  {
    code: codeResponse.OBJECT_NOT_FOUND,
    message: "Object not found",
  },
  {
    code: codeResponse.NOT_AUTHENTICATE,
    message: "Not authenticated",
  },
  {
    code: codeResponse.INCORRECT_CREDENTIALS,
    message: "Incorrect credentials",
  },
  {
    code: codeResponse.FAILED_SCHEMA_VALIDATION,
    message: "Some fields are required or incorrect",
  },
  {
    code: codeResponse.SUCCESSFUL_DELETED,
    message: "Successfully deleted",
  },
  {
    code: codeResponse.ALREADY_EXIST_OBJECT,
    message: "Object is already in use",
  },
  {
    code: codeResponse.OBJECT_UPDATED_SUCCESSFULLY,
    message: "Object successfully updated",
  },
  {
    code: codeResponse.FAILED_TRANSACTION_VALIDATION,
    message: "It is possible that the product is out of stock or the details are incorrect.",
  },
];

export const getResponse = (responseCode) => {
  return detailResponse.find(item => item.code === responseCode);
};
