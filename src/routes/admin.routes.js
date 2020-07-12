const {Router} = require('express');
const router = Router();
const {rendersignupForm,  signup}   = require('../controllers/index.controller');
const { isAuthenticated, isAdmin } = require('../helpers/auth');
const { renderusers, renderbox, deleteuser } = require('../controllers/admin.controller');



router.get('/register', isAuthenticated, isAdmin, rendersignupForm);
router.post('/register',isAuthenticated, isAdmin,signup);



router.get('/list-users',isAuthenticated,isAdmin, renderusers);//render list users
router.get('/list-box',isAuthenticated, renderbox);//render list box


router.post('/user/delete/:id',isAuthenticated,isAdmin, deleteuser );//render del formulario con cochera



module.exports = router;