module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    customer_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    order_date: DataTypes.DATEONLY,
    status: { type: DataTypes.STRING, defaultValue: 'pending' } // pending, shipped, cancelled, deleted
  }, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    Order.belongsTo(models.User, { foreignKey: 'user_id' });
    Order.hasMany(models.OrderItem, { foreignKey: 'order_id' });
    Order.hasMany(models.Delivery, { foreignKey: 'order_id' });
  };

  return Order;
};
