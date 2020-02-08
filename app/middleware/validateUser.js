const { 
    check , validationResult , matchedData
} = require('express-validator');
const users_db = require('../../database.js');



module.exports = {
    valRules: [
        check('email', 'error: Email')
        .trim().isEmail().normalizeEmail(),
        
        check('password', 'error: Password')
        .trim().isLength({ min: 5 , max: 15 })
    ],

    validateData: (req,res,next) => {
        const errors = validationResult(req);
        const userData = matchedData(req);

        if ( !errors.isEmpty() ) {
            console.log(
                errors.mapped(), 
                '\n', 
                userData
            )
            
            res.json({
                errors: errors.mapped(),
                user: userData
            })
        } else {
            // res.send('√ √')
            // checkEmail()
            next()
        }
    },

    checkEmail: (req,res,next) => {
        const { email } = req.body;

        let user = users_db.find( user => {
            return user.email === email;
        });

        if (user) {
            console.log('user:', user)
            res.send(`${user.email} is already an user`)
        } else {
            // res.send('√ √ √')
            // createUser()
            next()
        }
    }
};