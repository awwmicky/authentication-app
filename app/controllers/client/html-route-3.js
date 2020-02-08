const router = require('express').Router();
const check = require('../../middleware/checkAuth.js');



router.get('/', (_,res) => {
    console.log('— Home Page —')

    res.render(
        'home.hbs',
        {
            title: 'Home Page',
            style: 'home.css',
            script: 'home.js'
        }
    )
})

router.get('/login', check.alreadyAuth, (_,res) => {
    console.log('— Login Page —')

    res.render(
        'login.hbs',
        {
            title: 'Login Page',
            style: 'login.css',
            script: 'login.js'
        }
    )
})

router.get('/register', check.alreadyAuth, (_,res) => {
    console.log('— Register Page —')

    res.render(
        'register.hbs',
        {
            title: 'Register Page',
            style: 'register.css',
            script: 'register.js'
        }
    )
})

router.get('/dashboard', check.isAuth, (_,res) => {
    console.log('— Dashboard Page —')

    res.render(
        'dashboard.hbs',
        {
            title: 'Dashboard Page',
            style: 'dashboard.css',
            script: 'dashboard.js'
        }
    )
})

router.get('*', (req,res) => {
    // console.log('— NO Page —')
    res.send('Page Not Found')
})



module.exports = router;