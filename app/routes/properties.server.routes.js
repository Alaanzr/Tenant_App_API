var properties = require('../../app/controllers/properties.server.controller'), users = require('../../app/controllers/users.server.controller');


module.exports = function(app) {

    // app.route('/properties').post(properties.createUserProperty).get(properties.list);

    app.route('/user_properties/:user_id').post(properties.createUserProperty);

    app.route('/properties').post(properties.create).get(properties.list);

    app.route('/properties/:property_id').get(properties.read).put(properties.update).delete(properties.delete);

    app.param('property_id', properties.property_id);

    app.param('user_id', users.user_id);
};
