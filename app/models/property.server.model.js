var mongoose = require('mongoose'), Schema = mongoose.Schema;

var PropertySchema = new Schema ({

  created: {
    type: Date,
    default: Date.now
  },
  location_area: String,

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

  inclusive: Boolean,

  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }


});

var Property = mongoose.model('Property', PropertySchema);

