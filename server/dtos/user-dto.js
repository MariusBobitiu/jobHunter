module.exports = class UserDto {
  id;

  constructor(model) {
    this.id = model.id;
    this.username = model.username;
    this.email = model.email;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
};
