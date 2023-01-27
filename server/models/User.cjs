// @ts-check

const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');
const encrypt = require('../lib/secure.cjs');

const unique = objectionUnique({ fields: ['email'] });

module.exports = class User extends unique(BaseModel) {
  static get tableName() { // указывает, как называется таблица в подключенной базе данных
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstname', 'lastname', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        firstname: {type: 'string', minLength: 1},
        lastname: {type: 'string', minLength: 1},
        email: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 3 },
      },
    };
  }

  set password(value) {
    this.passwordDigest = encrypt(value);
  }

  verifyPassword(password) {
    console.log(encrypt(password));
    console.log(this.passwordDigest);
    return encrypt(password) === this.passwordDigest;
  }
}