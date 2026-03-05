const express = require('express');
const ExerciseController = require('../controllers/Exercise/exerciseController');
const { uploadLocal } = require('../middlewares/multerLocal');

const router = express.Router();

router.post('/exercise/saveExercise', uploadLocal.single('file'), ExerciseController.saveExercisePlan);
router.put('/exercise/updateExercise/:id', uploadLocal.single('file'), ExerciseController.updateExercisePlan);
router.get('/exercise/getallExercisePlans', ExerciseController.getAllExercisePlans);
router.get('/exercise/getExercisebyId/:id', ExerciseController.getExercisePlanById);
router.delete('/exercise/deleteExercise/:id', ExerciseController.deleteExercisePlanById);

module.exports = router;
