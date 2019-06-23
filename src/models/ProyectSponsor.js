const { Schema } = require('mongoose');

const SponsorSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: false },
    id_sponsor: { type: Schema.Types.ObjectId, required: true },
    amount: { type: String, required: true }
});

module.exports = SponsorSchema;