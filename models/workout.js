let mongoose = require('mongoose');

// Create a model
let workoutModel = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    date: { type: Date, required: true }
},
{ collection: "workout" }
);
module.exports = mongoose.model('Workout', workoutModel);