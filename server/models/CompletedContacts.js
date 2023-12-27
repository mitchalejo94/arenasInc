module.exports = (sequelize, DataTypes) => {
  const CompletedContacts = sequelize.define("CompletedContacts", {
    // Fields specific to completed contacts, if any
    // ...
  });

  CompletedContacts.associate = (models) => {
    CompletedContacts.belongsTo(models.Contact, {
      foreignKey: "contactId", // Assuming Contact has an 'id' primary key field
      onDelete: "CASCADE", // Optional: Cascade delete if the contact is deleted
      onUpdate: "CASCADE", // Optional: Cascade update if the contact is updated
    });
  };

  return CompletedContacts;
};
