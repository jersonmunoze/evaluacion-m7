require('dotenv').config();
//Estoy consciente que esto podría ir en un .env pero el ejercicio pedía que se incluyera el nombre de manera fija en db.config.js así que quedó así
module.exports = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: '1234',
    DB: 'db_bootcamp',
    dialect: 'postgres',
};