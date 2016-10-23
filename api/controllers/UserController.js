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
			if(req.param('Busca') == undefined)
			{
				busca = {};
			}
			else
			{
				busca = req.param('Busca')
				busca = {name: { like: busca['name']+'%'}};
			}

	    User.find(busca).exec(function foundUser (err, users) {
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

	password: function (req, res) {

		if( req.session.authenticated && req.session.passport.user == req.param('id') )
		{
			var msg = "";

			if(req.param("password") != req.param("confirm-password"))
			{
					msg = "As senhas são diferentes. Favor tente novamente!"
			}
			else if(req.method=="POST" && req.param("password",null)!=null)
	    {
	    	
		      Passport.find()
		      	.populate('user',{where : {id: req.param('id')}})
		      	.exec(function (err, passport){
		      		
		      		if(passport[0] == undefined) {
	  						msg = 'Nenhum usuario encontrado!';
		      		}
		      		else
		      		{
				      		passport.password = req.param("password");
			      		
				      		Passport.update({id: passport[0].id}, {password: passport.password})
				      			.exec(function(err, pass) {
				      				msg = "Senha atualizada com sucesso!"
									    if(err) {msg = "Senha não foi Atualizada!"} 
									});
				      	
		      		}
		      	})
	    			res.redirect( '/');
			       //   res.redirect( 'user/show/'+user.id);
			}
	      res.view({msg:msg}); 
    }
    else
    {
    	res.redirect( '/');
    }
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

