module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define("Notes", {
    noteBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Notes;
};
