var cron = require('node-cron')
const { User } = require('../models')
const { Op } = require('sequelize')
const nodemailer = require('nodemailer')

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

const job = cron.schedule(
  '0 9 * * *',
  async function () {
    const user = await getUser()

    if (user.length >= 1) {
      for (let i = 0; i < user.length; i++) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: process.env.ETHEREAL_EMAIL,
            pass: process.env.ETHEREAL_PASS
          }
        })

        let info = await transporter.sendMail({
          from: process.env.ETHEREAL_EMAIL,
          to: process.env.TO_EMAIL,
          subject: 'Happy Birthday!',
          text: `Happy bithday! ${user[i].first_name} ${user[i].last_name}`,
          html: `<b>Happy bithday! ${user[i].first_name} ${user[i].last_name}</b>`
        })
        console.log('Message sent: %s', info.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
      }
    }
  },
  {
    scheduled: true,
    timezone: 'Asia/Jakarta'
  }
)

module.exports = job
