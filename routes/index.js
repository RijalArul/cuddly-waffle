const express = require('express')
const UserController = require('../controllers/user.controllers')
const router = express.Router()

router.get('/users', UserController.findAll)
router.post('/users', UserController.register)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.delete)

module.exports = router
