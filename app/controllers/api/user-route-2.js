const router = require('express').Router();
const passport = require('../../custom/init-auth/passport.js');



router.post('/login', (req, res, next) => {
    console.log('— Login POST —')

    passport.authenticate('local', userLogin)(req, res, next)
    
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
    console.log('— Logout GET —')
    req.logout()

    res.redirect('/')
});



module.exports = router;