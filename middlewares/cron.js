var cron = require('node-cron')
const { User } = require('../models')
const { Op } = require('sequelize')
const { default: axios } = require('axios')

function formatDate (date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [month, day].join('-')
}

async function getUser () {
  const today = formatDate(new Date())
  const user = await User.findAll({
    where: {
      birthday: {
        [Op.like]: `%${today}%`
      }
    }
  })

  return user
}

async function generateEmail () {
  const users = await getUser()

  if (users.length >= 1) {
    for (let i = 0; i < users.length; i++) {
      const job = cron.schedule(
        '52 22 * * *',
        async function fn () {
          try {
            const resp = await axios({
              method: 'POST',
              url: 'https://email-service.digitalenvision.com.au/send-email',
              data: {
                email: 'fakhrulmrijal.hacktiv8@gmail.com',
                message: `Hey, ${
                  users[i].first_name + ' ' + users[i].last_name
                } it’s your birthday`
              }
            })
          } catch (err) {
            if (err.response.status == 'Timeout') {
              setTimeout(() => {
                fn()
              }, 1000 * 3600 * 24)
            }
          }
        },
        {
          scheduled: true,
          timezone: users[i].location
        }
      )
      job.start()
    }
  }
}

module.exports = generateEmail
