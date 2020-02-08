const passport = require('passport');

module.exports = {
    isAuth: (req,res,next) => {
        console.log(
            'User:', req.isAuthenticated(), req.user
        )
        
        // if ( req.user ) {
        if ( req.isAuthenticated() ) {
            next()
        } else {
            res.redirect('/login')
        }
    },

    alreadyAuth: (req,res,next) => {
        console.log(
            'User:', req.isAuthenticated(), req.user
        )
        
        // if ( req.user ) {
        if ( req.isAuthenticated() ) {
            res.redirect('/dashboard')
        } else {
            next()
        }
    },

    useAuth: (req,res,next) => {
        console.log(req.body)
        passport.authenticate('local', userLogin)(req,res,next)

        function userLogin (err, user, info) {
            if (info)  { return res.send(info.message) }
            if (err)   { return next(err) }
            if (!user) { return res.redirect('/login') }
            
            console.log(
                'req.session.passport:', req.session.passport,
                '\n'+
                'req.user:', req.user
            )
    
            // req.login(user, userResult)
            req.data = user;
            next()
        }
    }
};