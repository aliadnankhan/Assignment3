let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Workout = require('../models/workout');

// get
// post
// put
// delete
// CRUD

// Get route for the read workout list - Read Operation
router.get('/', async(req,res,next) => {
    try
    {
        let WorkoutList = await Workout.find();
        // console.log(WorkoutList);
        res.render('Workouts/list', {
            title: 'Workout List',
            WorkoutList: WorkoutList
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Workouts/list', {
            error: 'Error on server'
        })
    }
})

// Get route for displaying the Add page - Create Operation
router.get('/add', async(req, res, next) => {
    try{
        res.render('Workouts/add', {
            title: 'Add a Workout'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Workouts/add', {
            error: 'Error on server'
        })
    }
})
// Post route for processing the Add page - Create Operation
router.post('/add', async(req, res, next) => {
    try
    {
        let newWorkout = Workout({
            "name": req.body.name,
            "description": req.body.description,
            "duration": req.body.duration,
            "sets": req.body.sets,
            "reps": req.body.reps,
            "date": req.body.date
        })
        Workout.create(newWorkout).then(() => {
            res.redirect('/workout')
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Workouts/add', {
            error: 'Error on server'
        })
    }
})
// Get route for displaying the Edit page - Update Operation
router.get('/edit/:id', async(req, res, next) => {
    try
    {
        const id = req.params.id;
        let workoutToEdit = await Workout.findById(id);
        res.render("Workouts/edit", 
            {
                title: 'Edit Workout',
                workout: workoutToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err);
    } 
})
// Post route for processing the Edit page - Update Operation
router.post('/edit/:id', async(req, res, next) => {
    try
    {
        let id = req.params.id;
        let updatedWorkout = Workout({
            "_id": id,
            "name": req.body.name,
            "description": req.body.description,
            "duration": req.body.duration,
            "sets": req.body.sets,
            "reps": req.body.reps,
            "date": req.body.date
        })
        Workout.findByIdAndUpdate(id, updatedWorkout).then(() => {
            res.redirect('/workout')
        })
    }
    catch(err)
    {
        console.error(err);
        next(err);
    }
})
// Get route for performing delete operation - Delete Operation
router.get('/delete/:id', async(req, res, next) => {
    try
    {
        let id = req.params.id;
        Workout.deleteOne({_id: id}).then(() => {
            res.redirect('/workout');
        })
    }
    catch(err)
    {
        console.error(err);
        next(err);
    }
})

module.exports = router;