var frisby = require('frisby');

var URL = 'http://localhost:1337/';


frisby.create('api call POST /properties to add a property then read, update and delete it')
.post(URL + 'properties_only', {
      "post_code": "AC1 02G",
      "street_name": "High Road",
      "landlord_name": "Mr Fixer-Upper",
      "landlord_contact_details": "555 999 911",
      "property_type": "Palace",
      "number_of_flatmates": 7,
      "monthly_cost": 1299,
      "deposit_amount": 1200,
      "inclusive": true
    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json; charset=utf-8')
    .expectBodyContains('_id')

  .afterJSON(function(property) {

    frisby.create('api call POST /user to add a user ')
      .post(URL + 'users', {
        "fullName": "Test person3",
        "username": "TPerson" +Math.random().toString(),
        "password": "password2",
        "provider": "local",
        "profile_picture": "mypingpongpicture2.jpg",
        "connections": [],
        "properties": ["56743f5004dabd110041f84e"]
      })

      .afterJSON(function(user) {

        frisby.create('READ specific property')
          .get(URL + 'properties/' + property._id)
          .expectStatus(200)
          .toss();

        frisby.create('UPDATE property')
          .put(URL + 'properties/' + property._id, {street_name: "Low Road"})
          .expectStatus(200)
          .toss();

        frisby.create('UPDATE USER with property')
          .post(URL + 'user_properties/' + user._id, {
            "post_code": "IA4 YOU",
            "street_name": "Low Road",
            "landlord_name": "Mr Richman",
            "landlord_contact_details": "777 9898 22",
            "property_type": "Hovel",
            "number_of_flatmates": 1,
            "monthly_cost": 99,
            "deposit_amount": 100,
            "inclusive": false
          })
          .expectStatus(200)
          .expectHeaderContains('content-type', 'application/json; charset=utf-8')
          .expectBodyContains('_id')
          .toss();

          frisby.create('DELETE user1')
          .delete(URL + 'users/' + user.id)
          .expectStatus(200)
          .toss();

          frisby.create('DELETE property')
          .delete(URL + 'properties/' + property._id)
          .expectStatus(200)
          .toss();

      }).toss();

  }).toss();

    frisby.create('api READ ALL /properties to return all properties')
      .get(URL + 'properties_only')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectBodyContains('_id')
        .expectJSONTypes('1', {
          _id: String,
          post_code: String,
          street_name: String,
          landlord_name: String,
          landlord_contact_details: String,
          property_type: String,
          number_of_flatmates: Number,
          monthly_cost: Number,
          deposit_amount: Number,
          inclusive: Boolean,
          __v: Number

  }).toss();









