const moment = require('moment/moment')
const RegisterUserDto = require('../dtos/user.dtos')
const UserRepository = require('../repositories/user.repositories')

class UserService {
  #userRepository

  constructor () {
    this.#userRepository = new UserRepository()
  }

  async getAllUsers (req, res) {
    try {
      const users = await this.#userRepository.findAll()
      res.status(200).json({
        data: users,
        message: 'Find All Users Success'
      })
    } catch (err) {
      res.status(500).json({
        err: err,
        message: 'Internal Server Error'
      })
    }
  }

  async createUser (req, res) {
    try {
      const { first_name, last_name, birthday, location } = req.body
      let birthday_date = moment(birthday).format('YYYY-MM-DD')
      const user = await this.#userRepository.create({
        first_name,
        last_name,
        birthday: birthday_date,
        location
      })
      res.status(201).json({
        data: user,
        message: 'Success Create User'
      })
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        let message = err.errors.map(el => {
          return el.message
        })

        res.status(400).json({
          err: message[0]
        })
      }
    }
  }

  async updateBirthday (req, res) {
    try {
      const { id } = req.params
      const { birthday } = req.body

      const user = await this.#userRepository.update(birthday, id)

      if (user) {
        res.status(200).json({
          data: user,
          message: 'Updated Birthday User Success'
        })
      } else {
        throw new Error('Failed Update Request')
      }
    } catch (err) {
      if (err.name === 'Failed Update Request') {
        res.status(400).json({
          err: err.name
        })
      } else {
        res.status(500).json({
          err: 'Internal Server Error'
        })
      }
    }
  }

  async deleteUser (req, res) {
    try {
      const { id } = req.params
      await this.#userRepository.delete(id)
      res.status(200).json({
        message: 'Deleted User'
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        err: 'Internal Server Error'
      })
    }
  }
}

module.exports = UserService
