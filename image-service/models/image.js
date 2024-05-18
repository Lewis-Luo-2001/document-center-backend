module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    document: DataTypes.INTEGER,
  }, {
    tableName: 'images'
  });

  return images;
};
