const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {
    valRules , validateData , checkEmail
} = require(
    '../../middleware/validateUser.js'
);
const { useAuth } = require('../../middleware/checkAuth.js');
const users_db = require('../../../database.js');



router.post(
    '/register', 
    valRules, validateData, checkEmail, 
    (req,res) => {
        console.log('— register user —')
        const { password } = req.body;
        
        const salt = bcrypt.genSaltSync(1);
        const hashedPass = bcrypt.hashSync(password, salt);
        console.log(hashedPass)
        
        users_db.push({
            id: Date.now().toString(),
            email: req.body.email,
            password: hashedPass
        })
        
        console.log(users_db[users_db.length - 1])
        res.redirect('/login')
    }
)

router.post('/login', useAuth, (req,res) => {
    console.log('— login user —')

    req.login(req.data, userResult)

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

router.get('/logout', (req,res) => {
    console.log('— logout user —')
    
    req.logout()

    req.session.destroy( (error) => {
        if (error) { return next(error) }
        
        console.log(
            'User:', req.isAuthenticated(), req.user
        )
        
        return res
        .clearCookie('connect.sid')
        .redirect('/');
    })
})




module.exports = router;