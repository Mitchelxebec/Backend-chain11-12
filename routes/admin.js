const express = require('express');
const router = express.Router();

const {
    getUser, 
    deleteUser,
} = require("../controllers/admin");

const { validateDeleteUserObj } = require('../validators/admin');
const { protect, verified, isAdmin } = require('../middlewares/admin');


const {
    addRole,
    getRole,
    getRoles,
    updateRole,
    deleteRole
} = require("../controllers/role");


const {validateAddAction} = require('../validators/action/section');
const{
    addAction,
    getAction,
    getActions,
    getActionsByRole,
    updateAction,
    deleteAction
} = require("../controllers/Action");

const { validateAddRole, validateGetRole, validateUpdateRole, validateDeleteRole } = require('../validators/role');


router.get('/get-user', protect, verified, isAdmin, getUser);
router.delete('/delete-user', protect, verified, isAdmin, validateDeleteUserObj, deleteUser);


router.get('/get-user', protect, verified,  getUser);
router.delete('/delete-user', protect, verified, validateDeleteUserObj, deleteUser);

router.post('/role', protect, verified, isAdmin, validateAddRole,  addRole);
router.get('/role', protect, verified,  isAdmin, validateGetRole, getRole);
router.get('/roles', protect, verified,  isAdmin, getRoles);
router.put('/roles/update-role', protect, verified, isAdmin, validateUpdateRole, updateRole);
router.delete('/roles/delete-role', protect, verified, isAdmin, validateDeleteRole, deleteRole);

router.post('/action', protect, verified, validateAddAction, addAction);
router.get('/action/:id',  protect, verified, getAction);
router.get('/actions',  protect, verified, getActions);
router.get('/actions/role/:roleId',  protect, verified, getActionsByRole);
router.put('/action/:id',  protect, verified, updateAction);
router.delete('/action/:id',  protect, verified, deleteAction);


module.exports = router;