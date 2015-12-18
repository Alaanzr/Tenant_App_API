var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PropertySchema = new Schema ({
  _id: Number,
  post_code: String,
  street_name: String,
  landlord_name: String,
  landlord_contact_details: String,
  contract_start: Date,
  contract_end :Date,
  property_type: String,
  number_of_flatmates: Number,
  monthly_cost: Number,
  deposit_amount: Number,
  inclusive: Boolean
});

var AppUserSchema = new Schema({
    _id: Number,
    name: {type: String, required: true },
    profile_picture: String,
    properties: [{ type: Number, ref: 'Property' }],
    connections: [{ type: Number, ref: 'AppUser' }]
});


var AppUser = mongoose.model('AppUser', AppUserSchema);

var Property = mongoose.model('Property', PropertySchema);


