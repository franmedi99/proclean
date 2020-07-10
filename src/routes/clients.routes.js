const { Router } = require('express');
const router = Router();

const { 
        createNewClient,
        renderListGarage,
        renderClients,
        findClient,
        sendToGarage,
        sendToBox,
        sendToBoxCar,
        egreso

}
        = require('../controllers/clients.controller');

        const { isAuthenticated } = require('../helpers/auth');

//----------------------Rutas de clientes----------------
//GET
router.get('/clients',isAuthenticated , renderClients);//render forms
router.get('/garage',isAuthenticated , renderListGarage);//render forms
router.get('/notes/edit/:id',isAuthenticated , sendToBoxCar);//render del formulario con cochera

router.get('/egreso',isAuthenticated , egreso);

//POST
router.post('/clients/new-client',isAuthenticated , createNewClient);//creando clientes
router.post('/clients/find-client',isAuthenticated ,findClient);//buscando clientes
router.post('/clients/send-garage',isAuthenticated , sendToGarage);//enviar cliente al garage
router.post('/tobox',isAuthenticated , sendToBox);//enviando a la caja
router.post('/toboxcar',isAuthenticated , sendToBoxCar);//enviando a la caja
module.exports = router;