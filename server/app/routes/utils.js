
function ensureLoggedIn(router){
	router.use(function(req,res,next){
		if(!req.user){
			res.sendStatus(401);
		}
	})
}

module.exports={ensureLoggedIn:ensureLoggedIn};
