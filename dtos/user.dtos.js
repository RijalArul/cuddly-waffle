class RegisterUserDto {
  first_name
  last_name
  birthday
  location

  constructor (first_name, last_name, birthday, location) {
    this.first_name = first_name
    this.last_name = last_name
    this.birthday = birthday
    this.location = location
  }
}

class UpdateUserDto {
  birthday

  constructor (birthday) {
    this.birthday = birthday
  }
}
module.exports = {
  RegisterUserDto,
  UpdateUserDto
}
