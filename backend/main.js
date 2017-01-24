const express = require('express');
const sessions = require('express-sessions');
const helmet = require('helmet');

// this enables some security-friendly middleware
app.use(helmet);

// TODO: auto-generate a secret and store it in sql db
app.use(sessions({
  secret: 'notverysecret',
  name: 'sessionID',
}));





