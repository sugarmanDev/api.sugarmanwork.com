module.exports = (sequelize, DataTypes) => {
  return sequelize.define('salk', {
    idx: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    question: {
      type: DataTypes.TEXT,
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
    tableName: 'salk',
  });
};
