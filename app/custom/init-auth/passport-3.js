const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const users_db = require('../../../database.js');



module.exports = (passport) => {

    passport.use(
        new LocalStrategy(
            { usernameField : 'email' }, authUser
        )
    )

    passport.serializeUser( (user, done) => {
        console.log('Serialize User:', user)
        
        done(null, user.id)
    })

    passport.deserializeUser( (id, done) => {
        console.log('Deserialize User:', id)

        let user = users_db.find( user => {
            return user.id === id;
        });

        done(null, user)
    })



    function authUser (email, password, done) {

        let user = users_db.find( user => {
            return user.email === email;
        });

        if (!user) {
            return done(
                null,false,{ message : 'Email not registered' }
            );
        }
    
        if (
            !bcrypt.compareSync(password, user.password)
        ) {
            return done(
                null,false,{ message : 'Password is invalid' }
            );
        }
    
        console.log(
            'data:', { data_email: email , data_pass: password },
            '\n'+
            'user:', user
        )
    
        return done(null,user)
        // return done(null,user,{ message : 'Authentication works' });
    }
};