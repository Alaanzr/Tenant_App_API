var properties = require('../../app/controllers/properties.server.controller');

module.exports = function(app) {
    app.route('/properties').post(properties.create).get(properties.list);

    // app.route('/api/properties').post(properties.create).get(properties.list);

    // app.route('/properties/:property_id').get(properties.read).put(properties.update).delete(properties.delete);
    //
    // app.route('/api/properties/:property_id').put(properties.update);
    //
    // app.param('property_id', properties.property_id);

};
