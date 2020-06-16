import 'dotenv/config';
import express from 'express';
import Youch from 'youch';
import 'express-async-errors';
import routes  from './routes';
import cors from 'cors';
import './database';
import { resolve } from 'path';

class App {
    constructor() {
        this.server = express();
        this.middleware();
        this.routes();
        this.exceptionHandler();
    }

    middleware() {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')));
    }

    routes () {
        this.server.use(routes);
    }

    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            let errors = { error: 'Internal server error.' };
            if (process.env.NODE_ENV === 'development')
                errors = await new Youch(err, req).toJSON();
            return res.status(500).json(errors);
        });
    }
}

export default new App().server;