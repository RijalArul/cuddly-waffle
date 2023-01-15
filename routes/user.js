const router = require('express').Router()
const UserController = require('../controllers/user.controllers')

router.get('/users', UserController.findAll)
router.post('/users', UserController.register)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.delete)

module.exports = router
