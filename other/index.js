'use strict';
require("dotenv").config()

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require('./config.js')[env];

var db = {};



console.log(config)
console.log('path: ' + __dirname)
console.log('base: ' + path.basename(__filename))
console.log('file: ' + fs.readdirSync( __dirname + '/../models/' ))



let sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(
        process.env[
            config.use_env_variable
        ],
        config
    );
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}



sequelize.authenticate()
.then( _ => console.log('Database Connected — ✓'))
.catch(err => console.log(`Err: ${err}`))



// fs
// .readdirSync( __dirname + '/../models' )
// .filter( file => {
//     return (
//         (file.indexOf('.') !== 0) &&
//         (file !== basename) &&
//         (file.slice(-3) === '.js')
//     );
// })
// .forEach( file => {
//     console.log(file);
//     var model = sequelize['import'](
//         path.join(__dirname, file)
//     );
//     db[model.name] = model;
// })



// Object
// .keys(db)
// .forEach( (modelName) => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// })



// db.sequelize = sequelize;
// db.Sequelize = Sequelize;



// db.Permission.hasMany(db.User)
// db.User.belongsTo(db.Permission)


// module.exports = db;