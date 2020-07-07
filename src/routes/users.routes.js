const {Router} = require('express');
const router = Router();
const {rendersignupForm, renderSigninForm, signup, signin}  = require('../controllers/users.controller')


router.get('/register', rendersignupForm);


router.post('/register',signup);


router.get('/login', renderSigninForm);


router.post('/login',signin);



module.exports = router;