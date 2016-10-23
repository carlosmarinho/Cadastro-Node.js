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
			console.log(req.param('Busca'))
			if(req.param('Busca') == undefined)
			{
				busca = {};
			}
			else
			{
				busca = req.param('Busca')
				busca = {name: { like: busca['name']+'%'}};
			}

			console.log(busca);
			
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

			if(req.method=="POST" && req.param("password",null)!=null)
	    {
	    	
	    	var bcrypt = require('bcryptjs');
	    	var oldhash;
	    	bcrypt.hash(req.param("old-password"), 10, function (err, oldhash) {
	      

		      Passport.find()
		      	.populate('user',{where : {id: req.param('id')}})
		      	.exec(function (err, passport){
		      		
		      		if(passport[0] == undefined) {
		      			
	  						msg = 'Nenhum usuario encontrado!';
	  
		      		}
		      		else
		      		{
		      			
		      			//if(oldhash == passport[0].password)
		      			{
				      		passport.password = req.param("password");
				      		console.log("old hash123: " + oldhash)
				      		
				      		Passport.update({id: passport[0].id}, {password: passport.password})
				      			.exec(function(err, pass) {
				      				
				      				msg = "Senha atualizada com sucesso!"
									    // In case of error, handle accordingly
									    if(err) {msg = "Senha não foi Atualizada!"} 
									    // Otherwise send a success message and a 200 status    
									    //return res.send('success');
									    
									});
				      	}
				      	//else
				      	{
				      		//msg = 'Senha Antiga não é válida!';
				      	}
		      		}
		      		console.log("mensagem: " + msg);
		      		
		      	})

	    	});
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

