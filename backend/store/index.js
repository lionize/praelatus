/*
 * Export all of our model stores. All stores return promises.
 */

const path = require('path');

const userStore = require('./user_store.js');
const noteStore = require('./note_store.js');
const jobStore = require('./job_store.js');

module.exports = {
  // default will return a store pointing at the postgres database using the
  // standard PG environment variables. It will additionally 
  // automatically call migrate on the database
  default: () => {
    let db = require('./postgres.js');
    db.migrate();

    return this.new(db);
  },

  // new will create a new store pointing at db which must have a query method
  // that returns a promise
  new: (db) => {
    return {
      users: userStore(db),
      jobs:  jobStore(db),
      notes: noteStore(process.env.NOTES_DIR || 
                       path.join(process.cwd(), notes))
    };
  }
};
