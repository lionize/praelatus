const Ajv = require('ajv');
const ajv = new Ajv();
const users = require('./user');

const schema = {
  title: 'Note Schema',
  type: 'object',
  properties: {
    title: { type: 'string' },
    body: { type: 'string' },
    owner: users.schema,
    sharedWith: {
      type: 'array',
      items: users.schema 
    }
  },
  require: [ 'title', 'owner' ]
};

module.exports = {
  schema: schema,
  validate: ajv.compile(schema),

  // fromText will take the contents of a note and parse it into a note
  // object
  fromText: (body) => {
    let s = body.split('+++');
    // sometimes the first element is an empty string
    if (s[0] === '') s.shift();
    // get our front matter
    let fm = s.shift();
    let obj = JSON.parse(fm);
    obj.body = s.shift();

    if (s.length > 0) {
      console.error('Something weird happened during parsing', body, s);
    }
    
    return obj;
  },

  // toText will take a note object and parse it into front matter + body for
  // storing on the file system
  toText: (note) => {
    let body = note.body;
    delete note.body;

    return '+++\n'+JSON.toString(note)+'\n+++\n'+body;
  }
};
