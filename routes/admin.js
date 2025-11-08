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


module.exports = router;