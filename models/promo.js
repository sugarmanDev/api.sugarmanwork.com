module.exports = (sequelize, DataTypes) => {
  return sequelize.define('promo', {
    idx: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    displayYN: {
      type: DataTypes.ENUM('Y', 'N'),
      allowNull: true,
    },
    regDate: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    checkYN: {
      type: DataTypes.ENUM('Y', 'N'),
      allowNull: true,
    },
    endYN: {
      type: DataTypes.ENUM('Y', 'N'),
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    formYN: {
      type: DataTypes.ENUM('Y', 'N'),
      allowNull: true,
    },
    site: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  
  {

    // don't forget to enable timestamps!
    timestamps: false,
    tableName: 'promo',
  });
};
