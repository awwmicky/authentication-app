const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const users_db = require('../../../database.js');



router.post('/register', (req,res) => {
    console.log('— register POST —')
    console.log(req.body, '√')

    const salt = bcrypt.genSaltSync(1);
    const hashedPass = bcrypt.hashSync(req.body.password, salt);
    console.log(hashedPass)

    users_db.push({
        id: Date.now().toString(),
        email: req.body.email,
        password: hashedPass
    })
    
    console.log(users_db[users_db.length - 1])
    res.redirect('/login')
})

router.post('/login', (req, res, next) => {
    console.log('— login POST —')

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

        req.login(user, userResult)
    }

    function userResult (error) {
        if (error) { return next(error) }
        
        console.log(
            'req.session.passport:', req.session.passport,
            '\n'+
            'req.user:', req.user
        )

        return res.redirect('/dashboard');
    }
})

router.get('/logout', (req, res) => {
    console.log('— logout GET —')
    
    req.logout()

    req.session.destroy( (error) => {
        if (error) { return next(error) }
        
        console.log(
            'User Authentication:', req.isAuthenticated(),
            '\n'+
            'req.user:', req.user
        )
        
        return res
        .clearCookie('connect.sid')
        .redirect('/');
    })
})




module.exports = router;