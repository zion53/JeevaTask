const mongoose = require('mongoose');


const recordingSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    soundFile: {
        type:Buffer,
        required: true
    }
});

const Recording = mongoose.model('Recording', recordingSchema);

module.exports = Recording;