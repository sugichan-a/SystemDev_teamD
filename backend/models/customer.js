module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: { type: DataTypes.STRING, allowNull: false },
    contact_person: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    delivery_conditions: DataTypes.TEXT,
    registered_at: DataTypes.DATEONLY,
    remarks: DataTypes.TEXT
  }, {
    tableName: 'customers',
    timestamps: false,
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.Order, { foreignKey: 'customer_id' });
  };

  return Customer;
};
