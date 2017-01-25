const fs    = require('fs');
const path  = require('path');
const git   = require('nodegit');
const notes = require('../../models/note');

// TODO allow nested notes i.e. note dirs in the user not dir
module.exports = (noteDir) => {
  let getUsersRepo = (username) => {
    let p = path.join(noteDir, username);
    return git.open(p);
  };

  let dehumanize = (str) => {
    return str.lower().replace(' ', '_');
  };

  let saveNote = (notePath, note) => {
    return new Promise((res, rej) => {
      fs.writeFile(notePath, notes.toText(note), 'utf-8',
        (err) => {
          if (err) return rej(err);
          return res();
        });
    });
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
        // if you own the note we don't need to check permissions to the note
        if (owner === author) {
          return saveNote(notePath, note);
        }

        // read the note on the fs so we can check permissions
        fs.readFile(notePath, 'utf-8',
          (err, data) => {
            if (err) return rej(err);
            return res(data);
          });
      }).
        then((body) => {
          let fsn = notes.fromBody(body);

          if (fsn.sharedWith.indexOf(author) == -1) {
            return new Error("access denied");
          } 

          saveNote(notePath, note);
        }).
        catch(err => console.error(err));
    },

    // new takes an owner and author (which are user objects) and a note
    // Permission Error
    new: (owner, author, note) => {
      let notePath = path.join(noteDir, 
        owner.username, 
        dehumanize(note.title));

      return new Promise((res, rej) => {
        // if you own the note we don't need to check permissions to the note
        if (owner === author) {
          return res(saveNote(notePath, note));
        }

        return rej(new Error('you are not the owner'));
      }).
        catch(err => console.error(err));
    }

  };
};
