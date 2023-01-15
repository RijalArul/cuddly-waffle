const request = require('supertest')
const app = require('../index')
const { User } = require('../models')

let user
let arrUser = []
beforeAll(async () => {
  user = {
    first_name: 'Fakhrul',
    last_name: 'Rijal',
    birthday: '2021-01-16',
    location: 'Asia/Jakarta'
  }

  const userData = await User.create(user)
  arrUser.push(userData)
})

afterAll(async () => {
  await User.destroy({ where: {}, restartIdentity: true })
})

describe('Testing Register user success with status code 201', () => {
  test('REGISTER /users', done => {
    const payload = {
      first_name: 'Fakhrul',
      last_name: 'Rijal',
      birthday: '2021-01-16',
      location: 'Asia/Jakarta'
    }

    request(app)
      .post('/users')
      .send(payload)
      .then(response => {
        expect(response.statusCode).toEqual(201)
        expect(response.body).toHaveProperty('data', response.body.data)
        expect(response.body).toHaveProperty('message', 'Success Create User')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('Testing Register user failed request with no required field value with status code 400', () => {
  test('REGISTER Failed user field /users', done => {
    const payload = {
      first_name: '',
      last_name: 'Rijal',
      birthday: '2021-01-16',
      location: 'Asia/Jakarta'
    }

    request(app)
      .post('/users')
      .send(payload)
      .then(response => {
        expect(response.statusCode).toEqual(400)
        done()
      })
      .catch(err => {
        done(err)
      })
  }, 3000)
})

describe('Get All users with statusCode 200', () => {
  test('Get all users /users', done => {
    request(app)
      .get('/users')
      .then(response => {
        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveProperty('data', response.body.data)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('Update user birthday with statusCode 200', () => {
  test('Update user birthday users/update/:id', done => {
    const id = arrUser[0].id
    const payload = {
      birthday: '2021-01-01'
    }
    request(app)
      .put(`/users/${id}`)
      .send(payload)
      .then(response => {
        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveProperty('data', response.body.data)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('Delete user success with statusCode 200', () => {
  test('Delete user success /users/:id', done => {
    const id = arrUser[0].id
    request(app)
      .delete(`/users/${id}`)
      .then(response => {
        expect(response.statusCode).toEqual(200)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('Delete user failed with statusCode 500', () => {
  test('Delete user failed /users/:id', done => {
    request(app)
      .delete(`/users/100000000000000000000000000000000000000`)
      .then(response => {
        expect(response.statusCode).toEqual(500)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
