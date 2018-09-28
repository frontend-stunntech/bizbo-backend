var mongoose = require('mongoose');
Schema = mongoose.Schema

var userSchema = mongoose.Schema({
    feedback: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    }
})

module.exports = mongoose.model('userfeedbacks', userSchema);
