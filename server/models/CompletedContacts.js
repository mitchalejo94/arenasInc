module.exports = (sequelize, DataTypes) => {
  const CompletedContacts = sequelize.define("CompletedContacts", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cityState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  CompletedContacts.associate = (models) => {
    CompletedContacts.belongsTo(models.Contact, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    CompletedContacts.hasMany(models.Notes, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };

  return CompletedContacts;
};
