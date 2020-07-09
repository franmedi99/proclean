const { Router } = require('express');
const router = Router();

const { 
        createNewClient,
        renderListGarage,
        renderClients,
        findClient,
        sendToGarage

}
        = require('../controllers/clients.controller');

        const { isAuthenticated } = require('../helpers/auth');

//----------------------Rutas de clientes----------------
//GET
router.get('/clients',isAuthenticated , renderClients);//render forms
router.get('/garage',isAuthenticated , renderListGarage);//render forms




//POST
router.post('/clients/new-client',isAuthenticated , createNewClient);//creando clientes
router.post('/clients/find-client',isAuthenticated ,findClient);//buscando clientes
router.post('/clients/send-garage',isAuthenticated , sendToGarage);//enviar cliente al garage


module.exports = router;