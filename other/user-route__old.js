const router = require('express').Router();

const passport = require('passport');
const authenticate = require('../../custom/passport.js');

let users_db = []; // ! fake DB !

authenticate(
    passport,

    (email) => users_db.find( user => {
        console.log(`email: ${email} |`, user)
        return user.email === email;
    }),
    
    (id) => users_db.find( user => {
        console.log(`id: ${id} |`, user)
        return user.id === id;
    })
)

const bcrypt = require('bcryptjs');

// const parse = require('../../custom/parse.js');
// const Joi = require('joi');
// const { 
//     check, validationResult, matchedData
// } = require('express-validator');
// const { Op } = require('../../models').Sequelize;

// const { User } = require('../../models');
/*  */



/*  */
router.post(
    '/login', 
    passport.authenticate(
        'local',
        {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            // failureFlash: true
        }
    )
)

router.post('/register', async (req,res) => {
    console.log(req.body)
    
    try {
        const salt = await bcrypt.genSaltSync(1);
        const hashedPass = await bcrypt.hashSync(req.body.password, salt);
        console.log(hashedPass)
        users_db.push({
            id: Date.now().toString(),
            name: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })
        console.log(users_db)
        res.redirect('/login')
    } catch (err) {
        console.log(err)
        res.redirect('/register')
    }
})

/* ----------------- */

// router.post('/register', (req,res) => {
//     console.log(req.body)
//     let errData = parse.captureError(req.body);

//     if (errData.length > 0) {
//         console.log(errData)
//         res.send('error')
//     } else {
//         // res.send('pass')
//         checkUserDB(req.body)
//     }

//     function checkUserDB (data) {
//         User
//         .findAll({
//             where: {
//                 [Op.or]: [
//                     { username: data.username },
//                     { email: data.email }
//                 ]
//             }
//         })
//         .then( user => {
//             let userData = parse.compareData(user, data);
            
//             if (userData.length > 0) {
//                 // console.log(user)
//                 console.log(userData)
//                 res.json(userData)
//             } else {
//                 createNewUser(data)
//             }
//         })
//         .catch( err => {
//             console.log(err)
//         })
//     }

//     function createNewUser (data) {
//         const salt = bcrypt.genSaltSync(5);
//         const hash = bcrypt.hashSync(data.password, salt);
//         console.log(hash)

//         if (!hash) {
//             console.log('error');
//         } else {
//             User
//             .create({
//                 username: data.username,
//                 email: data.email,
//                 password: hash
//             })
//             .then( user => {
//                 console.log(user)
//                 res.redirect('/login')
//             })
//             .catch( err => {
//                 console.log(err)
//             })
//         }
//     }
// })

// router.post(
//     '/register',
//     [
//         check('username', 'error: username')
//         .trim().isEmail().normalizeEmail(),
        
//         check('password', 'error: password')
//         .trim().isLength({ min : 5, max : 15 }),

//         check('c_password')
//         .custom( (val, { req }) => {
//             if (val !== req.body.password) {
//                 throw new Error('password does not match');
//             } else {
//                 return true;
//             }
//         })
//     ],
//     (req,res) => {
//         console.log(req.body)
//         const errors = validationResult(req);
//         if ( !error.isEmpty() ) {
//             console.log( errors.mapped() )
//             res.send( errors.mapped() )
//         } else {
//             const user = matchedData(req);
//             console.log(user)
//             res.send(user)
//         }
// })

// router.post('/register', (req,res) => {
//     console.log(req.body)
//     const schema = 
//     Joi
//     .object().keys({
//         username: Joi.string(),
//         password: Joi.string().min(5).max(10).required(),
//         email: Joi.string().trim().email().required()
//     });

//     Joi.validate(req.body, schema, (err,result) => {
//         if (err) {
//             console.log(err)
//             res.send('error')
//             return
//         } else {
//             console.log(result)
//             res.send('pass')
//         }
//     })
// })

// router.post('/register', (req,res) => {
//     const constraints = {
//         first_name: {
//             presence: true,
//             length: {
//                 maximum: 50
//             }
//         },
//         last_name: {
//             presence: true,
//             length: {
//                 maximum: 50
//             }
//         },
//         username: {
//             presence: true,
//             length: {
//                 minimum: 8,
//                 maximum: 20
//             }
//         },
//         password: {
//             presence: true,
//             length: {
//                 minimum: 8,
//                 maximum: 20
//             }
//         }
//     };
//     console.log(req.body)

//     const validation = validate({...req.body}, constraints);

//     if (validation) {
//         return res
//             .status(400)
//             .json({ error : validation })
//         ;
//     } else {

//     }
// })



// module.exports = router;