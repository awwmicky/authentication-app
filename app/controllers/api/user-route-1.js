const router = require('express').Router();
const passport = require('../../custom/init-auth/passport.js');



router.post('/login', passport.authenticate(
    'local', 
    {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    }
))

// router.post(
//     '/login',
//     passport.authenticate(
//         'local', 
//         { failureRedirect : '/login' }
//     ),
//     (req, res) => {
//         console.log('→ User Auth: √')
//         res.redirect('/dashboard')
//     }
// )

router.get('/logout', (req, res) => {
    console.log('— Logout GET —')
    req.logout()

    res.redirect('/')
})




module.exports = router;