const express = require('express');
const router = express.Router();

const {
    getUser, 
    deleteUser,
} = require("../controllers/admin");

const { validateDeleteUserObj } = require('../validators/admin');
const { protect, verified } = require('../middlewares/admin');
router.use(protect, verified);

const {
    addRole,
} = require("../controllers/role");

const { validateAddRole } = require('../validators/role');
const {validateAddAction} = require('../validators/section/section');
const{
    addAction,
    getAction,
    getActions,
    getActionsByRole,
    updateAction,
    deleteAction
} = require("../controllers/Action");


router.get('/get-user',  getUser);
router.delete('/delete-user',  validateDeleteUserObj, deleteUser);


router.post('/', validateAddRole,  addRole);

router.post('/actions', validateAddAction, addAction);
router.get('/actions/:id', getAction);
router.get('/actions', getActions);
router.get('/actions/role/:roleId', getActionsByRole);
router.put('/actions/:id', updateAction);
router.delete('/actions/:id', deleteAction);


module.exports = router;