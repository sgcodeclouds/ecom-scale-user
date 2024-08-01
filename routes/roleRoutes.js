const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/roleController')

router.post('/create', RoleController.createRole)

router.get('/get/:id', RoleController.getRoleById)

router.get('/get', RoleController.getRoles)

router.put('/update/:id', RoleController.updateRole)

router.delete('/delete/:id', RoleController.deleteRole)

module.exports = router