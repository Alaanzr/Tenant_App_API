 var Property = require('mongoose').model('Property'), User = require('mongoose').model('User');


 var getErrorMessage = function(err) {
   if (err.errors) {
     for (var errName in err.errors) {
       if (err.errors[errName].message)
       return err.errors[errName].message;
       }
     } else {
       return 'Unknown server error';
     }
 };
 //
 // exports.user_id = function(req, res, next, id) {
 //     User.findOne({
 //             _id: id
 //         },
 //         '-password -salt',
 //         function(err, user) {
 //             if (err) {
 //                 return next(err);
 //             }
 //             else {
 //                 req.user = user;
 //                 next();
 //             }
 //         }
 //     );
 // };

 exports.createUserProperty = function(req, res) {
   var property = new Property(req.body);
   property.creator = req.user;

   property.save(function(err) {
     if (err) {
       return res.status(400).send({
         message: getErrorMessage(err)
       });
     } else {
       res.json(property);
       User.findByIdAndUpdate(req.user.id, { $push: {properties: property.id} }, function(err, user) {
         if (err) {
           return next(err);
         } else {
           user.save();
         }
       });
     }
   });
 };

  // exports.createUserProperty = function(req, res, next) {
  //   var property = new Property(req.body);
  //   property.save(function(err) {
  //     if (err) {
  //       return next(err);
  //     }
  //     else {
  //       console.log(req.user);
  //       res.json(property);
  //     }
  //   });
  // };

  // exports.test = function() {
  //   console.log('hi');
  //   createUserProperty();
  // };

  // exports.createUserProperty = function(req, res, next) {
  //   var property = new Property(req.body);
  //   property.save(function(err) {
  //     if (err) {
  //       return next(err);
  //     }
  //     else {
  //       console.log('***************');
  //       console.log(window.user);
  //       console.log('***************');
  //       User.findByIdAndUpdate(user._id, { properties: user.properties.push(res.json(property._id)) });
  //       res.json(user);
  //     }
  //   });
  // };

  exports.list = function(req,res, next) {
    Property.find( {}, function(err, property) {
      if (err) {
        return next(err);
      }
      else {
        res.json(property);
      }
    });
  };

  exports.read = function(req, res) {
    res.json(req.property);
};

exports.property_id = function(req, res, next, id) {
    Property.findOne({
            _id: id
        },
        function(err, property) {
            if (err) {
                return next(err);
            }
            else {
                req.property = property;
                next();
            }
        }
    );
};


exports.update = function(req, res, next) {
    Property.findByIdAndUpdate(req.property.id, req.body, {new: true}, function(err, property) {
        if (err) {
            return next(err);
        }
        else {
            res.json(property);
        }
    });
};


exports.delete = function(req, res, next) {
    req.property.remove(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(req.property);
        }
    });
};
