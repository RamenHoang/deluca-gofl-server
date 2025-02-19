const companyService = require('./../services/company.service');

let getAllCompanies = async (req, res) => {
    try {
        let dataCompany = await companyService.getAllCompanies();

        return res.status(200).json(dataCompany);
    } catch (error) {   
        return res.status(500).json(error);
    }
}

let addNewCompany = async (req, res) => {
    try {
        let data = req.body;
        let addNew = await companyService.addNewCompany(data);

        return res.status(200).json(addNew);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let deleteCompanyById = async (req, res) => {
    try {
        let id =  req.params.id;
        let deleteCom = await companyService.deleteCompanyById(id);

        return res.status(200).json(deleteCom);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getCompanyById = async (req, res) => {
    try {
        let id = req.params.id;
        let company = await companyService.getCompanyById(id);

        return res.status(200).json(company);
    } catch (error) {   
        return res.status(500).json(error);
    }
}

let updateCompanyById = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let company = await companyService.updateCompanyById(id, data);

        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    getAllCompanies,
    addNewCompany,
    deleteCompanyById,
    getCompanyById,
    updateCompanyById
}

