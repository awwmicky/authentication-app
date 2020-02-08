const router = require('express').Router();



router.get('/', (_, res) => {
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

router.get('/login', (_, res) => {
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

router.get('/register', (_, res) => {
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

router.get('/dashboard', (req, res) => {
    console.log('— Dashboard Page —')
    console.log('User Authentication:', req.isAuthenticated())

    if ( req.isAuthenticated() ) {
        res.render(
            'dashboard.hbs',
            {
                title: 'Dashboard Page',
                style: 'dashboard.css',
                script: 'dashboard.js'
            }
        )
    } else {
        res.redirect('/login')
    }
})

router.get('*', (req,res) => {
    // console.log('— NO Page —')
    res.send('Page Not Found')
})



module.exports = router;