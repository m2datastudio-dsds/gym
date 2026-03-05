const express = require('express');
const DietController = require('../controllers/Diet/dietController');
const { uploadLocal } = require('../middlewares/multerLocal');

const router = express.Router();

router.post('/diet/saveDiet', uploadLocal.single('file'), DietController.saveDietPlan);
router.put('/diet/updateDiet/:id', uploadLocal.single('file'), DietController.updateDietPlan);
router.get('/diet/getallDietplan', DietController.getAllDietPlans);
router.get('/diet/getDietbyId/:id', DietController.getDietPlanById);
router.delete('/diet/deleteDietplan/:id', DietController.deleteDietPlanById);

module.exports = router;
