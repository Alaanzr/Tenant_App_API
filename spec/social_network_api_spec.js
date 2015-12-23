var frisby = require('frisby');

var URL = 'http://localhost:1337/';


frisby.create('api call POST "/user_connection/user_id1/user_id2" to REQUEST a connection, PUT "/user_connection/user_id1/user_id2" to ACCEPT a connection and GET "/user_connection/user_id1/user_id2" to CHECK a connection and DELETE "/user_connection/user_id1/user_id2" to CANCEL a connection')

  .post(URL + 'users', {
    "fullName": "Test person1",
    "username": "TPerson1" +Math.random().toString(),
    "password": "password1",
    "provider": "local",
    "profile_picture": "mypingpongpicture1.jpg",
    "requests_sent": [],
    "requests_recd": [],
    "connections": ["567851b0f9e7231015c5ec57","567851c6f9e7231015c5ec5a"],
    "properties": ["56743f5004dabd110041f84e"]
  })
  .afterJSON(function(user1) {

    frisby.create('add another user')
      .post(URL + 'users', {
        "fullName": "Test person2",
        "username": "TPerson2" +Math.random().toString(),
        "password": "password2",
        "provider": "local",
        "profile_picture": "mypingpongpicture2.jpg",
        "requests_sent": [],
        "requests_recd": [],
        "connections": ["567851b0f9e7231015c5ec57","567851c6f9e7231015c5ec5a"],
        "properties": ["56743f5004dabd110041f84e"]
      })

    .afterJSON(function(user2) {
      frisby.create('CHECK a connection user2 is a connection of user1  - when not connected')
      .get(URL + 'user_connection/' + user1.id +'/' + user2.id)
      .expectStatus(200)
      .toss();

      frisby.create('send REQUEST for a connection from user1 to user2  - when not connected')
      .post(URL + 'user_connection/' + user1.id +'/' + user2.id)
      .expectStatus(200)
      .expectBodyContains('"requests_sent":[{"_id":' + '"' + user1.id.toString() + '"')
      .expectBodyContains('"requests_recd":[{"_id":' + '"' + user2.id.toString() + '"')
      // .inspectJSON()
      .toss();


      frisby.create('DELETE user')
      .delete(URL + 'users/' + user1.id)
      .expectStatus(200)
      .toss();

      frisby.create('DELETE user')
      .delete(URL + 'users/' + user2.id)
      .expectStatus(200)
      .toss();


    }).toss();

  }).toss();
