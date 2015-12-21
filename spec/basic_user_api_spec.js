var frisby = require('frisby');

var URL = 'http://localhost:1337/';


frisby.create('api call POST /user to add a user then read, update and delete it')
.post(URL + 'users', {
      "fullName": "Test person3",
      "username": "TPerson" +Math.random().toString(),
      "password": "password2",
      "provider": "local",
      "profile_picture": "mypingpongpicture2.jpg",
      "connections": [],
      "properties": ["56743f5004dabd110041f84e"]
    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json; charset=utf-8')
    .expectBodyContains('_id')

  .afterJSON(function(user) {

    frisby.create('READ specific user')
      .get(URL + 'users/' + user.id)
      .expectStatus(200)
      .toss();

    frisby.create('READ specific users properties')
      .get(URL + 'users_properties/' + user.id)
      .expectStatus(200)
      .toss();

    frisby.create('UPDATE user')
      .put(URL + 'users/' + user.id, {connections: [user.id]})
      .expectStatus(200)
      .toss();

    frisby.create('DELETE user')
      .delete(URL + 'users/' + user.id)
      .expectStatus(200)
      .toss();

  })
.toss();


frisby.create('api READ ALL /users to return all users')
  .get(URL + 'users')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectBodyContains('_id')
    .expectJSONTypes('1', {
      _id: String,
      provider: String,
      username: String,
      firstName: String,
      lastName: String,
      email: String,
      __v: Number,
      connections: [],
      properties: [],
      created: String,
      fullName: String,
      id: String
    })
.toss();







