require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./src/db');
const userRouter = require('./src/routes/user');
const workspacesRouter = require('./src/routes/workspace');

const port = process.env.PORT || 8000;

const app = express();
connect();

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/workspaces', workspacesRouter);

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});