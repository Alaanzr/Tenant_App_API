var User = require('mongoose').model('User'),
    passport = require('passport');


    var getErrorMessage = function(err) {
        var message = '';
        if (err.code) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Something went wrong';
            }
        }
        else {
            for (var errName in err.errors) {
                if (err.errors[errName].message)
                    message = err.errors[errName].message;
            }
        }

        return message;
    };

    exports.renderSignin = function(req, res, next) {
        if (!req.user) {
            res.render('signin', {
                title: 'Sign-in Form',
                messages: req.flash('error') || req.flash('info')
            });
        }
        else {
            return res.redirect('/');
        }
    };

    exports.renderSignup = function(req, res, next) {
        if (!req.user) {
            res.render('signup', {
                title: 'Sign- Form',
                messages: req.flash('error')
            });
        }
        else {
            return res.redirect('/');
        }
    };


    exports.signup = function(req, res, next) {
        if (!req.user) {
            var user = new User(req.body);
            var message = null;
            user.provider = 'local';
            user.save(function(err) {
                if (err) {
                    var message = getErrorMessage(err);
                    req.flash('error', message);
                    return res.redirect('/signup');
                }
                req.login(user, function(err) {
                    if (err)
                        return next(err);

                    return res.redirect('/');
                });
            });
        }
        else {
            return res.redirect('/');
        }
    };

    exports.signout = function(req, res) {
        req.logout();
        res.redirect('/');
    };



exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });
};

exports.list = function(req, res, next) {
    User.find({}, '-password -salt',
        function(err, user) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });
};

var indexOf_id = function(id, arrWithId) {
    // var test = -1;
    // arrWithId.forEach(function(item, index) {
    //     if(id.toString() === item._id.toString()) {
    //         test = index;
    //     }
    // });
    // return test;
    return arrWithId.indexOf(id)
};

exports.read = function(req, res) {
    res.json(req.user);
};

exports.property_read = function(req, res) {
    res.json(req.user.properties);
};

exports.user_check = function(req, res) {
    var result = indexOf_id(req.user2._id, req.user.connections);
    res.json(result);
};



exports.user_request = function(req, res) {

    req.user.requests_sent.unshift(req.user2._id);
    User.findByIdAndUpdate(req.user.id, { requests_sent: req.user.requests_sent },{new: true}, function(err, user) {
        if (err) {
            return next(err);
        }
        else {
                req.user = user;
        }
    });

    req.user2.requests_recd.unshift(req.user._id);
    User.findByIdAndUpdate(req.user2.id, { requests_recd: req.user2.requests_recd },{new: true}, function(err, user) {
        if (err) {
            return next(err);
        }
        else {
                req.user2 = user;
        }
    });

    var result = [req.user,req.user2];
    res.json(result);
};

exports.user_connect = function(req, res) {

    var result = indexOf_id(req.user2._id ,req.user.requests_sent);



    req.user.requests_sent.splice( result, 1 );

    req.user.connections.unshift(req.user2._id);

    User.findByIdAndUpdate(req.user.id, { requests_sent: req.user.requests_sent, connections: req.user.connections },{new: true}, function(err, user) {
        if (err) {
            return next(err);
        }
        else {
            req.user = user;
        }
    });

    var result2 = indexOf_id(req.user._id, req.user.requests_recd);

    req.user.requests_recd.splice( result2, 1 );

    req.user2.connections.unshift(req.user._id);

    User.findByIdAndUpdate(req.user2.id, { requests_recd: req.user.requests_recd, connections: req.user2.connections },{new: true}, function(err, user) {
        if (err) {
            return next(err);
        }
        else {
                req.user2 = user;
        }
    });

    var result3 = [req.user,req.user2];
    res.json(result3);

};


exports.user_disconnect = function(req, res) {

    var result1 = indexOf_id(req.user2._id, req.user.connections);

    req.user.connections.splice(result1, 1 );

    User.findByIdAndUpdate(req.user.id, { connections: req.user.connections },{new: true}, function(err, user) {
        if (err) {
            return next(err);
        }
        else {
                req.user = user;
        }
    });



    var results2 = indexOf_id(req.user._id, req.user2.connections);

    req.user2.connections.splice( results2, 1 );

    User.findByIdAndUpdate(req.user2.id, { connections: req.user2.connections },{new: true}, function(err, user) {
        if (err) {
            return next(err);
        }
        else {
                req.user2 = user;
        }
    });

    var result = [req.user,req.user2];
    res.json(result);

};

exports.user_id = function(req, res, next, id) {
    User.findOne({
            _id: id
        },
        '-password -salt',
        function(err, user) {
            if (err) {
                return next(err);
            }
            else {
                req.user = user;
                next();
            }
        }
    );
};

exports.user_id2 = function(req, res, next, id) {
    User.findOne({
            _id: id
        },
        '-password -salt',
        function(err, user) {
            if (err) {
                return next(err);
            }
            else {
                req.user2 = user;
                next();
            }
        }
    );
};

exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body,{new: true}, function(err, user) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });
};


exports.delete = function(req, res, next) {
    req.user.remove(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(req.user);
        }
    });
};

exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }

  next();
};
