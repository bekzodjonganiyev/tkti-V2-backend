const mongoose = require('mongoose')

const PhotoSchema = mongoose.Schema({
    width: String,
    height: String,
    photo: String,
    date: {
        type: Date,
        default: new Date()
    }
    


});


module.exports = mongoose.model('photoSchema', PhotoSchema);