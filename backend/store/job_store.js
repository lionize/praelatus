module.exports = (db) => {
  return {
    // get will take a username or id and return the corresponding user
    get: (nameOrId) => {
      return db.query(
        `select id, name, body, note_name 
                row_to_json(u.*) as owner
         from jobs
         join users as u on u.id = jobs.owner_id
         where id = $1 or name = $2`, 
        [nameOrId, nameOrId]).
        then((res) => {
          return res.rows[0];
        }).
        catch(err => console.error(err));
    },
   
    // getAll will get all the jobs from the database
    getAll: () => {
      return db.query(
        'select * from jobs').
        then((res) => {
          return res.rows;
        }).
        catch(err => console.error(err));
    },

    getNotifications: (job) => {
      return db.query(
        `select u.* from job_notifications as jn
         join users as u on u.id = jn.user_id
         where jn.job_id = $1`, 
        [job.id]).
        then((res) => {
          return res.rows;
        }).
        catch(err => console.error(err));
    },

    // delete will take an id for a user and remove that user from the db
    delete: (id) => {
      return db.query(
        `delete from job_notifications where job_id = $1;
         delete from jobs where id = $1`,
        [id]).
        then((res) => {
          return res.rows[0];
        }).
        catch(err => console.error(err));
    },

    // new will take a user object and create it in the database
    new: (job) => {
      return Promise.all([
        db.query(
          `insert into jobs
           (name, note_name, body, owner_id)
           VALUES ($1, $2, $3, $4)`,
          [job.name, job.note.name, job.body, job.owner.id]),
        new Promise((res, rej) => {
          let promises = [];

          job.notify.map((u) => {
            promises.push(db.query(`
              insert into job_notifications
              (job_id, user_id) VALUES ($1, $2)`,
              [job.id, u.id]));
          });

          return Promise.all(promises);
        })
      ]).
        catch(err => console.error(err));
    }
  };
};
