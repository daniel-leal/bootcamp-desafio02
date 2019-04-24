const moment = require('moment')
const { Op } = require('sequelize')
const { User, Appointment } = require('../models')

class AppointmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    return res.redirect('/app/dashboard')
  }

  async show (req, res) {
    const { id } = req.session.user
    const date = moment().format()

    const appointments = await Appointment.findAll({
      where: {
        provider_id: id,
        date: {
          [Op.gte]: date
        }
      },
      include: [
        {
          model: User,
          as: 'Client'
        }
      ]
    })

    return res.render('appointments/show', { appointments })
  }
}

module.exports = new AppointmentController()
