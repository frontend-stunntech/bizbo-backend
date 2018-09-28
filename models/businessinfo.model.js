var mongoose = require('mongoose');
Schema = mongoose.Schema

var userSchema = mongoose.Schema({
   
    businessLocation: {
        type: String,
        // required: true
    },
    businessType: {
        type: String,
        // required: true
    },
    experience: {
        type: String,
        // required: true
    },
    businessEntityType: {
        type: String,
        // required: true
    },
    budget: {
        type: String,
        // required: true
    },
    havePartners: {
        type: String,
        required: true
    },
    bizRegistered: {
        type: String,
        // required: true
    },
    lookingInvestors: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    }
})

module.exports = mongoose.model('reportrequests', userSchema);
