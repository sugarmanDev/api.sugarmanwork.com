module.exports = (sequelize, DataTypes) => {
  return sequelize.define('branchModel', {
    idx: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    branchIdx: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {

    // don't forget to enable timestamps!
    timestamps: false,
    tableName: 'branch',
  });
};
