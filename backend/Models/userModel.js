module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resetLink: {
        type: DataTypes.STRING,
      },
      goalValue: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      timeFrame: {
        type: DataTypes.STRING,
        defaultValue: "daily",
      },
      // TODO: Add two factor authentication
      // twoFactorAuth: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: false,
      // },
    },
    { timestamps: true }
  );

  User.associate = (models) => {
    User.hasMany(models.Job, {
      foreignKey: "UserId",
      as: "jobs",
    });
  };

  return User;
};
