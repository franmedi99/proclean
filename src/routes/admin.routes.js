const {Router} = require('express');
const router = Router();
const { isAuthenticated, isAdmin } = require('../helpers/auth');
const { renderusers } = require('../controllers/admin.controller');

router.get('/list-users',isAuthenticated,isAdmin, renderusers);//render forms



module.exports = router;