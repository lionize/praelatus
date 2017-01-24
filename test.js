const bcrypt = require('bcrypt');

let hash = (pw) => {
  return bcrypt.hash(pw, 10).
    then((res) => {
      return res;
    });
}


hash("mypassword").
  then((res) => {
    bcrypt.compare("mypassword", res).
      then((valid) => {
        console.log(valid);
      });
  });
