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
router.put('/update-role', protect, verified, isAdmin, validateUpdateRole, updateRole);
router.put('/delete-role', protect, verified, isAdmin, validateDeleteRole, deleteRole);

router.post('/actions', protect, verified, validateAddAction, addAction);
router.get('/actions/:id',  protect, verified, getAction);
router.get('/actions',  protect, verified, getActions);
router.get('/actions/role/:roleId',  protect, verified, getActionsByRole);
router.put('/actions/:id',  protect, verified, updateAction);
router.delete('/actions/:id',  protect, verified, deleteAction);


module.exports = router;