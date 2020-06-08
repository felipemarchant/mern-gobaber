import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';

import config from '../config/database';

const models = [User, File];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(config);
        models.map(model => model.init(this.connection))
    }
}