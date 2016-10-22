	/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
		if( req.session.authenticated && req.session.passport.isAdmin == '1' )
		{
	    User.find(function foundUser (err, users) {
	      if(err) return res.redirect('/user/new');
	      res.view({
	        users: users
	      });
	    });
		}
		else{
			res.redirect( '/');
		}
  },

	edit: function(req, res){
    	User.findOne({id: req.param('id')}).exec(function (err, user){
			  if (err) {
			    return res.serverError(err);
			  }

			  if (!user) {
			    return res.notFound('Nenhum Usuário encontrado.');
			  }
			  else{
			  	res.view({
			  		user: user
			  	});
			  }
			})
    	
  },

  update: function (req, res) {

      User.findOne({id: req.param('id')}).exec(function (err, user){
      	if(req.method=="POST" && req.param("User",null)!=null)
      	{
      		var u=req.param("User",null);
      		console
        	user.username	= u.username;
        	user.name			= u.name;
        	user.email		= u.email;

        	user.save(function(err){
        		if (err) {
        			console.log(err)
	          	res.send("Error");
		        }else {
		          res.redirect( 'user/show/'+user.id);
		        }
        	})
      	}
      }); 
  },
	

  show: function(req, res){
    	User.findOne({id: req.param('id')}).exec(function (err, user){
			  if (err) {
			    return res.serverError(err);
			  }

			  if (!user) {
			    return res.notFound('Nenhum Usuário encontrado.');
			  }
			  else{
			  	res.view({
			  		user: user
			  	});
			  }
			})
    	
  }
	
};

