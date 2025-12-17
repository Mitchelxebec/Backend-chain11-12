const express = require('express');
const router = express.Router();

const {
    getUser, 
    deleteUser,
} = require("../controllers/admin");

const { validateDeleteUserObj } = require('../validators/admin');
const { protect, verified, isAdmin, hasRole } = require('../middlewares/admin');

const {
    addRole,
    getRole,
    getRoles,
    updateRole,
    deleteRole
} = require("../controllers/role");


const {
    validateAddAction, 
    validateUpdateAction, 
    validateAddActiontoUser, 
    validateRemoveActionFromUser
} = require("../validators/action");

const{
    addAction,
    getAction,
    getActions,
    getActionsByRole,
    updateAction,
    deleteAction,
    removeActionfromUser,
    addActionToUser,
} = require("../controllers/action");

const { validateAddRole, validateGetRole, validateUpdateRole, validateDeleteRole } = require('../validators/role');

router.get('/get-user', protect,  verified, isAdmin, getUser);
router.delete('/delete-user', protect, verified, isAdmin, validateDeleteUserObj, deleteUser);

router.post('/role', protect, verified, isAdmin, validateAddRole,  addRole);
router.get('/role', protect, verified,  isAdmin, validateGetRole, getRole);
router.get('/roles', protect, verified,  isAdmin, getRoles);
router.put('/role/update-role', protect, verified, isAdmin, validateUpdateRole, updateRole);
router.delete('/roles/delete-role', protect, verified, isAdmin, validateDeleteRole, deleteRole);

router.post('/action', protect, verified, hasRole('admin', 'superadmin'), validateAddAction, addAction);
router.get('/actions',  protect, verified, getActions);
router.put('/action/add-action-to-user', protect, verified, isAdmin, validateAddActiontoUser, removeActionfromUser);
router.put('/action/remove-action-from-user',protect,verified, isAdmin, validateRemoveActionFromUser,addActionToUser);
router.get('/action/:id',protect, verified, getAction);
router.get('/actions/role/:roleId',  protect, verified, getActionsByRole);
router.put('/action/:id',  protect, verified, validateUpdateAction, updateAction);
router.delete('/action/:id',  protect, verified, deleteAction);

module.exports = router;