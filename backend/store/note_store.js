const fs   = require('fs');
const path = require('path');
const git  = require('nodegit');

// TODO allow nested notes i.e. note dirs in the user not dir
module.exports = (noteDir) => {
  let getUsersRepo = (username) => {
    let p = path.join(noteDir, username);
    return git.open(p);
  };

  let dehumanize = (str) => {
    return str.lower().replace(' ', '_');
  };

  return {
    // get will get the note body by name for the given user's username
    get: (user, note) => {
      return new Promise((res, rej) => {
        let notePath = path.join(noteDir, user.username, note);
        fs.readFile(notePath, 'utf-8', 
          (err, data) => {
            if (err) return rej(err);
            return res(data);
          });
      });
    },

    // getAll will get all of the notes for the given user
    getAll: (user) => {
      let notePath = path.join(noteDir, user.username);

      return new Promise((res, rej) => {
        fs.readdir(notePath, 'ascii', 
          (err, files) => {
            if (err) return rej(err);
            return res(files);
          });
      }).
        then((files) => {
          return files.filter(f => !f.startsWith('.git'));
        });
    },

    // delete will delete the note by name for the given user
    delete: (user, note) => {
      let notePath = path.join(noteDir, user.username, note);

      return new Promise((res, rej) => {
        fs.unlink(notePath, 
          (err, data) => {
            if (err) return rej(err);
            return res(data);
          });
      }).
        then((res) => {
          return getUsersRepo(user.username);
        }).
        then((repo) => {
          return repo.createCommitOnHead([notePath], 
            git.Signature.now(user.fullName, user.email),
            git.Signature.now(user.fullName, user.email),
            `${note} removed by Praelatus! https://praelatus.io`);
        }).
        catch((err) => {
          console.error(err);
        });
    },

    // newUser will create a users note directory
    newUser: (user) => {
      return git.Repository.
        // create bare repository
        init(path.join(noteDir, user.username), false).
        then((res) => {
          console.log(`successfully created repo for ${user.username}`);
        }).
        catch(err => console.error(err));
    },

    // update takes an owner and author (which are user objects) and a note
    // object it will verify permissions of the author to update the given note
    // and then will perform the update if possible otherwise throwing a
    // PermissionError
    update: (owner, author, note) => {
      let notePath = path.join(noteDir, 
                               owner.username, 
                               dehumanize(note.title));

      return new Promise((res, rej) => {

      }).catch(err => console.error(err));
    }


  };
};
