const express = require('express');
const PackageController = require('../controllers/Package/packageController');

const router = express.Router();

router.post('/package/savepackage', PackageController.savePackage);
router.get('/package/getallpackage', PackageController.getallPackage);
router.get('/package/getpackagebyid/:id', PackageController.getpackagebyId);
router.put('/package/updatepackage/:id', PackageController.updatePackage);
router.delete('/package/deletepackage/:id', PackageController.deletePackage);
router.get('/package/getpackageandname', PackageController.getPackageandName);

module.exports = router;
