const UserService = require('../services/user.services')

const userService = new UserService()

class UserController {
  static async findAll (req, res) {
    return await userService.getAllUsers(req, res)
  }

  static async register (req, res) {
    return await userService.createUser(req, res)
  }

  static async update (req, res) {
    return await userService.updateBirthday(req, res)
  }

  static async delete (req, res) {
    return await userService.deleteUser(req, res)
  }
}

module.exports = UserController
