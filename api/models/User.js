var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
  	name			: { type: 'string' },
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    isAdmin   : { type: 'int', defaultsTo: 0},
    passports : { collection: 'Passport', via: 'user' }
  }
};

module.exports = User;
