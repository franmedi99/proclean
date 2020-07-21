const {
    Router
} = require('express');
const router = Router();

const {
    renderSigninForm,
    signin
} = require('../controllers/index.controller');
const {
    renderindex
} = require('../controllers/index.controller');

router.get('/', renderindex);






router.get('/login', renderSigninForm);



router.post('/login', signin);



module.exports = router;