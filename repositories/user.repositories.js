const { User } = require('../models')
class UserRepository {
  #userDB

  constructor () {
    this.#userDB = User
  }

  async findAll () {
    const users = await this.#userDB.findAll()
    return users
  }

  async create (userDto) {
    const user = await this.#userDB.create(userDto)
    return user
  }

  async update (updateDto, id) {
    const user = await this.#userDB.update(
      { birthday: updateDto },
      {
        where: {
          id: id
        },
        returning: true
      }
    )

    return user[1][0]
  }

  async delete (id) {
    return await this.#userDB.destroy({
      where: {
        id: id
      }
    })
  }
}

module.exports = UserRepository
