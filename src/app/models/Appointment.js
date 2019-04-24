module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.DATE
  })

  Appointment.associate = models => {
    Appointment.belongsTo(models.User, { as: 'Client', foreignKey: 'user_id' })
    Appointment.belongsTo(models.User, {
      as: 'Provider',
      foreignKey: 'provider_id'
    })
  }

  return Appointment
}
