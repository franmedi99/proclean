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
       deleteofGarage,
       closeBox

}
        = require('../controllers/users.controller');

        const { isAuthenticated } = require('../helpers/auth');

//----------------------Rutas de USUARIOS----------------
//GET GENERAL
router.get('/clients',isAuthenticated , renderClients);//render forms

//GET COCHERA
// router.get('/garage',isAuthenticated , renderListGarage);//render forms
// router.get('/egreso/:id',isAuthenticated , sendToBoxCar);//render del formulario con cochera

//POST GENERAL
router.post('/clients/new-client',isAuthenticated , createNewClient);//creando clientes
router.post('/clients/find-client',isAuthenticated ,findClient);//buscando clientes
router.post('/closebox',isAuthenticated ,closeBox);//enviando a la caja

//POST LAVADO
router.post('/tobox',isAuthenticated , sendToBox);//enviando a la caja

//POST COCHERA
//router.post('/clients/send-garage',isAuthenticated , sendToGarage);//enviar cliente al garage
//router.post('/egresar',isAuthenticated ,deleteofGarage);//enviando a la caja

module.exports = router;