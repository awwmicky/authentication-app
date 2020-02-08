const LocalStrategy = require('passport-local').Strategy;
// const passport = require('passport');
const bcrypt = require('bcryptjs');

// const { User } = require('../models/');

module.exports = (passport, userEmail, userId) => {
    passport.use(
        new LocalStrategy(
            { usernameField : 'email' }, authUser
        )
    )

    passport.serializeUser( (user,done) => {
        console.log('serialize:', user)
        return done(null, user.id);
    });
      
    passport.deserializeUser( (id,done) => {
        console.log('deserialize:', id)
        return done( userId(id) );
    });



    function authUser (email,password,done) {
        console.log(email,done);
        const user = userEmail(email)    
        console.log('user:', user)

        if (user === undefined) {
            return done(
                null, false, {msg : 'email is not registered'}
            );
        } else {
            console.log('email - √');
            compareUserPass(user, password, done)
        }
    }

    function compareUserPass (user,password,done) {
        console.log(password,'-',user.password);
        bcrypt
        .compare(
            password,
            user.password
        )
        .then( match => {
            console.log(`matching — ${match}`)
            if (!match) {
                return done(
                    null, false, {msg : 'incorrect password'}
                );
            } else {
                console.log('password - √')
                return done(null, user);
            }
        })
        .catch( err => {
            console.log(err)
        })
    }



    // function __authUser (email,password,done) {
    //     User
    //     .findAll({
    //         where: {
    //             email: email
    //         }
    //     })
    //     .then( user => {
    //         if (!user) {
    //             return done(
    //                 null, 
    //                 false, 
    //                 {
    //                     msg: 'email is not registered'
    //                 }
    //             );
    //         } else {
    //             console.log(user);
    //             bcrypt
    //             .compareSync(
    //                 password,
    //                 user[0].dataValues.password
    //             )
    //             .then( match => {
    //                 if (match) {
    //                     return done(null, user);
    //                 } else {
    //                     return done(
    //                         null,
    //                         false,
    //                         {
    //                             msg: 'incorrect password'
    //                         }
    //                     )
    //                 }
    //             })
    //             .catch( err => {
    //                 console.log(err)
    //             })
    //         }
    //     })
    //     .catch( err => {
    //         console.log(err)
    //     })
    // }

};

/* 
= passport.use(p1,p2) =
- options for strategy
- passport callback
- initialize passport
- 

= persist through request =
- secret : oauth
- resave : resave session variables if nothing changed?
- saveUninitialized : optional session to save empty value 
*/
/* 
= passport =
- auth logout
- auth with token 
*/
/* 
= q & a =
- how to return errors
- how to return done (callback)
- why does it return [object Object] for success
- what done done() params contain
- where is the information stored
*/
/* 
- user : reference to passport
- req.user
*/