const {Router} = require('express');
const router = Router();
const {rendersignupForm,  signup}   = require('../controllers/index.controller');
const { isAuthenticated, isAdmin } = require('../helpers/auth');
const { renderusers, renderbox, deleteuser, editreceipt,deletereceipt, renderclients,closeday,renderprices} = require('../controllers/admin.controller');


//registrar usuario
router.get('/register', isAuthenticated, isAdmin, rendersignupForm);
router.post('/register',isAuthenticated, isAdmin,signup);


//rutas de caja
router.get('/list-users',isAuthenticated,isAdmin, renderusers);//render list users
router.get('/list-box',isAuthenticated,isAdmin, renderbox);//render list box
router.get('/historial/edit/:id',isAuthenticated,isAdmin, editreceipt);//render edit receipt


router.post('/historial/delete/:id',isAuthenticated,isAdmin,deletereceipt);//render edit receipt
router.post('/close-day',isAuthenticated,isAdmin,closeday);//render edit receipt

//rutas de clientes
router.get('/all-clients',isAuthenticated,isAdmin, renderclients);//render list users


router.get('/price',isAuthenticated,isAdmin, renderprices);//render list users


router.post('/user/delete/:id',isAuthenticated,isAdmin, deleteuser );//render del formulario con cochera



module.exports = router;