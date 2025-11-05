const express = require('express');
const router = express.Router();

const {
    getUser, 
    deleteUser,
} = require("../controllers/admin");

const { validateDeleteUserObj } = require('../validators/admin');
const { protect, verified } = require('../middlewares/admin');

const {
    addRole,
    updateRole,
    deleteRole
} = require("../controllers/role");

const { validateAddRole, validateUpdateRole, validateDeleteRole } = require('../validators/role');




router.get('/get-user', protect, verified,  getUser);
router.delete('/delete-user', protect, verified, validateDeleteUserObj, deleteUser);


router.post('/add-role', validateAddRole,  addRole);
router.put('/update-role', validateUpdateRole, updateRole);
router.put('/delete-role', validateDeleteRole, deleteRole);


module.exports = router;