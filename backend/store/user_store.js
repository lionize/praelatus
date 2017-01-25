const noteStore = require('./note_store.js');

module.exports = (db) => {
  return {
    // get will take a username or id and return the corresponding user
    get: (usernameOrId) => {
      return db.query(
        'select * from users where id = $1 or username = $2', 
        [usernameOrId, usernameOrId]).
        then((res) => {
          return res.rows[0];
        }).
        catch(err => console.error(err));
    },
   
    // getAll will get all the users from the database
    getAll: () => {
      return db.query(
        'select * from users').
        then((res) => {
          return res.rows;
        }).
        catch(err => console.error(err));
    },

    // delete will take an id for a user and remove that user from the db
    delete: (id) => {
      return db.query(
        'delete from users where id = $1',
        [id]).
        then((res) => {
          return res.rows[0];
        }).
        catch(err => console.error(err));
    },

    // new will take a user object and create it in the database
    new: (user) => {
      return db.query(
      `insert into users 
        (username, password, email, fullName, profilePic)
        VALUES ($1, $2, $3, $4, $5)`,
        [user.username, user.password, user.email, 
          user.fullName, user.profilePic]).
        then((res) => {
          noteStore.newUser(res.rows[0]);
          return res.rows[0];
        }).
        catch(err => console.error(err));
    },

    // update takes a user object and updates the corresponding user in the
    // database
    update: (user) => {
      return db.query(
        `update users 
         SET (username, password, email, fullName, profilePic)
         = ($1, $2, $3, $4, $5) WHERE id = $1`,
        [user.id]).
        then((res) => {
          return res.rows[0];
        }).
        catch(err => console.error(err));
    }


  };
};
