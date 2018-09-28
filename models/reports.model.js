var mongoose = require('mongoose');
Schema = mongoose.Schema
var userSchema = mongoose.Schema({
    companyId:{
        type: String
    },
   businessdata : [],
    marketvalue : [],
    
    comments: {
        type: String,
        // required: true
    },
    recommendations: {
        type: String,
        // required: true
    },
    yaxislabel: {
        type: String,
        // required: true
    }

})

module.exports = mongoose.model('reports', userSchema);
