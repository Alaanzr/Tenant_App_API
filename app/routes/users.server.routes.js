var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {

    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);

    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));

    app.get('/signout', users.signout);

    app.get('/api/signin',
        passport.authenticate('basic', { session: false }),
        function(req, res) {
            res.json(req.user);
        }
    );


    app.route('/users').post(users.create).get(users.list);

    app.route('/users/:user_id').get(users.read).put(users.update).delete(users.delete);

    app.route('/users_properties/:user_id').get(users.property_read);

    app.route('/user_con_list/:user_id').get(users.connect_read);

    app.route('/user_connection/:user_id/:user_id2').post(users.user_request).get(users.user_check).put(users.user_connect).delete(users.user_disconnect);

    app.param('user_id', users.user_id);

    app.param('user_id2', users.user_id2);

};
