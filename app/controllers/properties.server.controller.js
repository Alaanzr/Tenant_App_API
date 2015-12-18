 var Property = require('mongoose').model('Property');

  exports.create = function(req, res, next) {
    var property = new Property(req.body);
    property.save(function(err) {
      if (err) {
        return next(err);
      }
      else {
        res.json(property);
      }
    });
  };

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
