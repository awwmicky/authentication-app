const express = require('express');
const app = express();



app.use( express.urlencoded( {extended : true} ) )
app.use( express.json() )
app.use( express.static('./app/public/') )



const session = require('express-session');
// const passport = require('./app/custom/init-auth/passport.js');
const initAuth = require('./app/custom/init-auth/passport.js');
const passport = require('passport');
initAuth(passport)
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    })
)
app.use( passport.initialize() )
app.use( passport.session() )



const hbs = require('./app/custom/hbs-engine/hbs.js');
const path = require('path');
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/app/views/'))




const userRoutes = require('./app/controllers/api/user-route.js');
const clientRoutes = require('./app/controllers/client/html-route.js');
app.use('/api/user', userRoutes)
app.use('/', clientRoutes)



const PORT = process.env.PORT || 5000;
app.listen(PORT, _ => {
    console.log(
        'Test Server —',
        `http://localhost:${PORT}`
    )
})