export default class UserDto {
  email;

  id;

  isActivated = false;

  constructor(model, rows) {
    if (rows) {
      this.email = model.email;
      this.id = rows.insertId;
      return;
    }
    this.email = model.email;
    this.id = model.id;
  }
}
