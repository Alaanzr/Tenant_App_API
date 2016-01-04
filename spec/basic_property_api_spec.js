// var frisby = require('frisby');

// var URL = 'http://localhost:1337/';


// frisby.create('api call POST /properties to add a property then read, update and delete it')
// .post(URL + 'properties', {
//       "post_code": "AC1 02G",
//       "street_name": "High Road",
//       "landlord_name": "Mr Fixer-Upper",
//       "landlord_contact_details": "555 999 911",
//       "property_type": "Palace",
//       "number_of_flatmates": 7,
//       "monthly_cost": 1299,
//       "deposit_amount": 1200,
//       "inclusive": true
//     })
//     .expectStatus(200)
//     .expectHeaderContains('content-type', 'application/json; charset=utf-8')
//     .expectBodyContains('_id')

//   .afterJSON(function(property) {

//     frisby.create('READ specific property')
//       .get(URL + 'properties/' + property._id)
//       .expectStatus(200)
//       .toss();

//     frisby.create('UPDATE user')
//       .put(URL + 'properties/' + property._id, {street_name: "Low Road"})
//       .expectStatus(200)
//       .toss();

//     frisby.create('DELETE user')
//       .delete(URL + 'properties/' + property._id)
//       .expectStatus(200)
//       .toss();

//   })
// .toss();


// frisby.create('api READ ALL /properties to return all properties')
//   .get(URL + 'properties')
//     .expectStatus(200)
//     .expectHeaderContains('content-type', 'application/json')
//     .expectBodyContains('_id')
//     .expectJSONTypes('1', {
//       _id: String,
//       post_code: String,
//       street_name: String,
//       landlord_name: String,
//       landlord_contact_details: String,
//       property_type: String,
//       number_of_flatmates: Number,
//       monthly_cost: Number,
//       deposit_amount: Number,
//       inclusive: Boolean,
//       __v: Number
//     })
// .toss();







