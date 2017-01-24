const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  title: "User Schema",
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    profilePic: { type: "string" },
    password: { type: "string" }
  },
  require: [ "firstName", "lastName", "email", "password" ]
}

module.exports = {
  schema: schema,
  validate: ajv.compile(schema)
}
