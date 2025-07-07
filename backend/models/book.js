module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: { type: DataTypes.STRING, allowNull: false },
    author: DataTypes.STRING,
    price: { type: DataTypes.INTEGER, allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    tableName: 'books',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  Book.associate = (models) => {
    Book.hasMany(models.OrderItem, { foreignKey: 'book_id' });
  };

  return Book;
};
