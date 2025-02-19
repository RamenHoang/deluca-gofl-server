const express = require('express');
const companyController = require('./../controllers/company.controller');
const router = express.Router();

router.get('/', companyController.getAllCompanies);
router.post('/', companyController.addNewCompany);
router.delete('/:id', companyController.deleteCompanyById);
router.get('/:id', companyController.getCompanyById);
router.put('/:id', companyController.updateCompanyById);

module.exports = router;