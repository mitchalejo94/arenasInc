module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("Contact", {
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

  Contact.associate = (models) => {
    Contact.hasMany(models.Notes, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };
  return Contact;
};
