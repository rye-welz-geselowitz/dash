
function ensureLoggedIn(router){
	router.use(function(req,res,next){
		console.log(req);
		if(!req.user){
			res.sendStatus(401);
		}
		next();
	})
}

module.exports={ensureLoggedIn:ensureLoggedIn};
