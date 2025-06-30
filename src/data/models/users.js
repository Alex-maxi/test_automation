class User {
  
    constructor(name = null, email = null, gender = null, status = null) {
      this._name = name;
      this._email = email;
      this._gender = gender;
      this._status = status;
    }
  
    getName() {
      return this._name;
    }

    getEmail() {
      return this._email;
    }

    getGender() {
      return this._gender;
    }
  
    getStatus() {
      return this._status;
    }
  
    setName(name) {
      this._name = name;
      return this;
    }

    setEmail(email) {
      this._email = email;
      return this;
    }
  
    setGender(gender) {
      this._gender = gender;
      return this;
    }

    setStatus(status) {
      this._status = status;
      return this;
    }
  
    remove() {
      this.setName(null)
          .setEmail(null)
          .setGender(null)
          .setStatus(null);
    }
  
    buildUserObj() {
      return {
        name: this.getName(),
        email: this.getEmail,
        gender: this.getGender(),
        status: this.getStatus()
      };
    }
  }
  
  module.exports = User;
  