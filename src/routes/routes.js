const {Router} = require('express');
const router = Router();

const {rendersignupForm, renderSigninForm, signup, signin}  = require('../controllers/users.controller');
const {renderindex} = require('../controllers/index.controller');

router.get('/', renderindex);





router.get('/register', rendersignupForm);
router.get('/login', renderSigninForm);


router.post('/register',signup);
router.post('/login',signin);



module.exports = router;