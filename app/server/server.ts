require('rootpath')();
require('dotenv').config();

// External Imports
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

// Internal Imports
import { errorHandler } from './_helpers/error-handler';
import { router } from './users/users.controller';
import { authorize } from './_helpers/authorize';

export const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(authorize());

// api routes
app.use('/api/users', router);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
