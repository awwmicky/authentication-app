const { User } = require('../models/');

isAuth = (req,res,next) => {
    
    const user_id = (req.user) ? req.user : null;

    if (user_id) {
        User
        .findByPk(user_id)
        .then( user => {
            if (user) {
                req.user_permission = user.permission_id
            }
        })
        .catch( err => {
            console.log(err)
        })
    } else {
        next()
    }
};

// module.exports = isAuth;