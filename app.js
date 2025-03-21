const express = require('express');
const cors = require('cors');
const logger = require('morgan');

require('dotenv').config();
const app = express();

const authRoyter = require('./routes/api/auth');
const monumentsRouter = require('./routes/api/monuments');
const epitaphsRouter = require('./routes/api/epitaphs');
const sendMessageRouter = require('./routes/api/sendMessage');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/admin', authRoyter);
app.use('/api/monuments', monumentsRouter);
app.use('/api/epitaphs', epitaphsRouter);
app.use('/api/sendMessage', sendMessageRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found!',
  });
});
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message: message });
});
module.exports = app;
