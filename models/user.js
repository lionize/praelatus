const Ajv = require('ajv');
const ajv = new Ajv();
const md5 = require('crypto').createHash('md5');
const bcrypt = require('bcrypt');

const schema = {
  title: 'User Schema',
  type: 'object',
  properties: {
    id: { type: 'integer' },
    fullName: { type: 'string' },
    email: { type: 'string', format: 'email' },
    profilePic: { type: 'string' },
    password: { type: 'string' }
  },
  require: [ 'fullName', 'email', 'password' ]
}

module.exports = {
  schema: schema,
  validate: ajv.compile(schema),

  // checkPw will return a promise indicating whether the password matches
  // the bcrypted hashword
  checkPw: (password, hashword) => {
    return bcrypt.compare(password, hashword)
  },

  // new returns a promise of the user object with a bcrypted password
  new: (firstName, lastName, email, password) => {
    return bcrypt.hash(password, 10).
      then((pw) => {
        return {
          firstName: firstName,
          lastName: lastName,
          email: email,
          profilePic: md5.update(email).digest('hex'),
          password: pw
        }
      })
  },

}
