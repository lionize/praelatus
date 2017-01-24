module.exports = (db) => {
  return {
    get: (usernameOrId) => {
      db.runQuery('select * from users where id = $1 or username = $2')
    }
  }
}
