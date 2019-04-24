const { User } = require('../models')

class DashboardController {
  async index (req, res) {
    const isProvider = req.session.user.provider
    const providers = await User.findAll({ where: { provider: true } })

    return res.render('dashboard', { providers, isProvider })
  }
}

module.exports = new DashboardController()
