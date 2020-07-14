const {Router} = require('express');
const router = Router();
const {rendersignupForm,  signup}   = require('../controllers/index.controller');
const { isAuthenticated, isAdmin } = require('../helpers/auth');
const { renderusers, renderbox, deleteuser, editreceipt,deletereceipt,updatereceipt, renderclients,closeday,
        renderprices,editclient,updateclient,deleteclient,renderdays, closemonth, rendermonths} = require('../controllers/admin.controller');


//registrar usuario
router.get('/register', isAuthenticated, isAdmin, rendersignupForm);
router.post('/register',isAuthenticated, isAdmin,signup);
router.post('/user/delete/:id',isAuthenticated,isAdmin, deleteuser );//borra un usuario

//rutas de caja
router.get('/list-users',isAuthenticated,isAdmin, renderusers);//render list users
router.get('/list-box',isAuthenticated,isAdmin, renderbox);//render list box

router.get('/historial/edit/:id',isAuthenticated,isAdmin, editreceipt);//render edit receipt
router.post('/historial/edit/:id',isAuthenticated,isAdmin,updatereceipt);//modify edit

router.post('/historial/delete/:id',isAuthenticated,isAdmin,deletereceipt);//render edit receipt
router.post('/close-day',isAuthenticated,isAdmin,closeday);//render edit receipt
router.post('/close-month',isAuthenticated,isAdmin,closemonth);//render edit receipt

//rutas de clientes
router.get('/all-clients',isAuthenticated,isAdmin, renderclients);//render list users

router.get('/client/edit/:id',isAuthenticated,isAdmin, editclient);//render list users
router.post('/client/edit/:id',isAuthenticated,isAdmin, updateclient);//render list users

router.post('/client/delete/:id',isAuthenticated,isAdmin, deleteclient);//render list users

//registros
router.get('/register/days',isAuthenticated,isAdmin, renderdays);//render list users
router.get('/register/month',isAuthenticated,isAdmin, rendermonths);//render list users



//rutas de precio
router.get('/price',isAuthenticated,isAdmin, renderprices);//render list users

module.exports = router;