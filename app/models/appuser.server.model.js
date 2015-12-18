var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var autopopulate = require("mongoose-autopopulate");

var PropertySchema = new Schema ({
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
    name: {type: String, required: true },
    profile_picture: String,
    properties: [{ type: Schema.Types.ObjectId, ref: 'Property', autopopulate: true }],
    connections: [{ type: Schema.Types.ObjectId, ref: 'AppUser', autopopulate: true }]
});
AppUserSchema.plugin(autopopulate);


var AppUser = mongoose.model('AppUser', AppUserSchema);

var Property = mongoose.model('Property', PropertySchema);


