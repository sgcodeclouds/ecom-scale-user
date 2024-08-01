const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')

router.post('/create', UserController.createUser)

router.get('/get/:id', UserController.getUserById)

router.get('/get', UserController.getUsers)

router.put('/update/:id', UserController.updateUser)

router.delete('/delete/:id', UserController.deleteUser)

module.exports = router