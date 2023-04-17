export default class UserDto {
  email;
  id;
  isActivated;

  constructor(model, rows) {
    this.email = model.email;
    this.id = rows.insertId;
    this.isActivated = 'false';
  }
}
