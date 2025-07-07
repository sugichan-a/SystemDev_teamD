module.exports = (sequelize, DataTypes) => {
  const Delivery = sequelize.define('Delivery', {
    order_id: DataTypes.INTEGER,
    delivery_date: DataTypes.DATEONLY,
    status: { type: DataTypes.STRING, defaultValue: 'delivered' }, // delivered, partial, failed
    note: DataTypes.TEXT
  }, {
    tableName: 'deliveries',
    timestamps: false,
  });

  Delivery.associate = (models) => {
    Delivery.belongsTo(models.Order, { foreignKey: 'order_id' });
  };

  return Delivery;
};
