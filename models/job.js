const Ajv = require('ajv');
const ajv = new Ajv();
const users = require('./user');
const notes = require('./note');

const schema = {
  title: 'Note Schema',
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    body: { type: 'string' },
    when: { type: 'string', format: 'date-time' }
    owner: users.schema,
    note: notes.schema,
    notify: {
      type: 'array',
      items: users.schema 
    }
  },
  require: [ 'name', 'owner', 'body', 'when' ]
}

module.exports = {
  schema: schema,
  validate: ajv.compile(schema)
}
