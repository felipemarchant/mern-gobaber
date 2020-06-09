import express from 'express';
import routes  from './routes';
import './database';
import { resolve } from 'path';

class App {
    constructor() {
        this.server = express();
        this.middleware();
        this.routes();
    }

    middleware() {
        this.server.use(express.json());
        this.server.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')));
    }

    routes () {
        this.server.use(routes);
    }
}

export default new App().server;