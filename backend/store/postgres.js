/*
 * This is where we wrap the pg stuff with easier to use functions
 * that return promises.
 */
const fs = require('fs');
const pg = require('pg').native;
const pool = new pg.Pool({
  max: 10,
  idleTimeoutMillis: 30000
});

let migrationVersion = (migration) => {
  console.log(migration);
  let lines = migration.split('\n');
  return parseInt(lines[0].replace('/*', '').replace('*/', ''));
};

let migrate = (client, res, err) => {
  let migrations = fs.readdirSync('./backend/migrations/');
  migrations = migrations.map((f) => 
    fs.readFileSync('./backend/migrations/'+f, 'ascii'));

  let schemaVersion = 0;
  if (!err) schemaVersion = res.rows[0].db_version;

  console.log('migrating the database...');
  let promises = [];
  for(let i = 0; i < migrations.length; i++) {
    if (migrationVersion(migrations[i]) > schemaVersion) {
      promises.push(client.query(migrations[i]));
    }
  }

  return Promise.all(promises).
    then((res) => {
      console.log('database successfully migrated...');
      client.release();
    }).
    catch((err) => {
      console.error(err);
      client.release();
    });
};

let runMigrations = (client) => {
  return client.query('select db_version from db_info').
    then((res) => {
      migrate(client, res, null);
    }).
    catch((err) => {
      migrate(client, null, err);
    });
};

module.exports = {
  pool: pool,
  migrate: () => {
    return pool.connect().
      then((client) => {
        return runMigrations(client);
      }).
      catch((err) => {
        console.error(err);
      });
  },
  query: () => {
    return pool.connect().
      then((client) => {
        return client.query(arguments);
      }).
      catch((err) => {
        console.error(err);
      });
  }
};
