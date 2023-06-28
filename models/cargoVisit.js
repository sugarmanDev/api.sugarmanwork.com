module.exports = (sequelize, DataTypes) => {
  return sequelize.define('cargoVisit', {
    idx: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    visitBranch:{
      type: DataTypes.INTEGER(10),
      allowNull:true,
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
    visitInputstore: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    storageSize: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    branch_desktop: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visitDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visitTime: {
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
	branchIdx: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    }

  }, {

    // don't forget to enable timestamps!
    timestamps: false,
    tableName: 'cargoVisit',
  });
};
