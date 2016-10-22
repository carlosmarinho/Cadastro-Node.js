var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
  	name			: { type: 'string' },
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    isAdmin   : { type: 'int', defaultsTo: 0},
    passports : { collection: 'Passport', via: 'user' }
  },

  /**
   * Callback to be run after create a user.
   *
   * @param {Object}   user The soon-to-be-created user
   * @param {Function} next
   */
  afterCreate: function (user, next) {
  	sails.hooks.email.send(
            "boasVindas",
            {
              recipientName: user.username,
              senderName: "Cadastro de cliente"
            },
            {
              to: user.email,
              subject: "Seja bem vindo"
            },
            function(err) {console.log(err || "It worked!");}
          );      

  	next(null, user);
    
  },
};

module.exports = User;

