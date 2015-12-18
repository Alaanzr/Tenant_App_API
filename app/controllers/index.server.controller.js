exports.render = function(req, res) {
    res.render('index', {
    	title: 'Tenant App',
      // Is this for passport?
      user: req.user ? req.user.username : ''
    });
};
