module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    name: { type: DataTypes.STRING, allowNull: false },
    address: DataTypes.TEXT,
    phone: DataTypes.STRING
  }, {
    tableName: 'stores',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  Store.associate = (models) => {
    Store.hasMany(models.User, { foreignKey: 'store_id' });
  };

  return Store;
};
