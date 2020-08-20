module.exports = (sequelize, DataTypes) => {
  return sequelize.define('sugarContent', {
    idx: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    channel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    target: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    titleFromUser: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    viewCount: {
      type: DataTypes.INTEGER(11),
      defaultValue:0,
      allowNull: true,
    },
    recommends: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue:0,

    },
    bookmarks: {
      type: DataTypes.INTEGER(11),
      defaultValue:0,
      allowNull: true,
    },
    
  }, {

    // don't forget to enable timestamps!
    timestamps: false,
    tableName: 'sugarContent',
  });
};
