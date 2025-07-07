module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false }, // 'admin', 'store_user'
    store_id: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  User.associate = (models) => {
    User.belongsTo(models.Store, { foreignKey: 'store_id' });
    User.hasMany(models.Order, { foreignKey: 'user_id' });
  };

  return User;
};
