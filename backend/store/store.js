const userStore = require('./user_store.js');
// const noteStore = require('./note_store.js');
// const jobStore = require('./job_store.js');
module.exports = (db) => {
  return {
    users: userStore(db)
  }
}
