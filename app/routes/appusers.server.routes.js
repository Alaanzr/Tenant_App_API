var appUsers = require('../../app/controllers/appusers.server.controller');

module.exports = function(app) {
    app.route('/appusers').post(appUsers.create).get(appUsers.list);

    app.route('/appusers/:appuser_id').get(appUsers.read).put(appUsers.update).delete(appUsers.delete);

    app.route('/appusers_properties/:appuser_id').get(appUsers.property_read);

    app.param('appuser_id', appUsers.appuser_id);
};
