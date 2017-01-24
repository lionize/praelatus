const Ajv = require('ajv');
const ajv = new Ajv();
const users = require('./user');

const schema = {
  title: 'Note Schema',
  type: 'object',
  properties: {
    id: { type: 'integer' },
    title: { type: 'string' },
    body: { type: 'string' },
    owner: users.schema,
    sharedWith: {
      type: 'array',
      items: users.schema 
    }
  },
  require: [ 'title', 'owner' ]
}

module.exports = {
  schema: schema,
  validate: ajv.compile(schema)
}
