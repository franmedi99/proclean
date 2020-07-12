const {Router} = require('express');
const router = Router();
const { isAuthenticated, isAdmin } = require('../helpers/auth');
const { renderusers, renderbox } = require('../controllers/admin.controller');

router.get('/list-users',isAuthenticated,isAdmin, renderusers);//render list users
router.get('/list-box',isAuthenticated,isAdmin, renderbox);//render list box

module.exports = router;