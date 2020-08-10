module.exports = (sequelize, DataTypes) => {
  return sequelize.define('cargoRequest', {
    idx: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subject: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    route: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    checkYN: {
      type: DataTypes.ENUM('Y', 'N'),
      allowNull: true,
    },
    regDate: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },

  }, {

    // don't forget to enable timestamps!
    timestamps: false,
    tableName: 'cargoRequest',
  });
};
