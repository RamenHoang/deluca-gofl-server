const companyModel = require('./../models/company.model');

let getAllCompanies = async () => {
    let dataCompany = await companyModel.getAllCompanies();

    return { message: 'SUCCESS', data: dataCompany };
}

let addNewCompany = async (data) => {
    let currCom = await companyModel.findCompanyByCode(data.c_code);
    if (currCom) {
        return { message: 'COMPANY_EXISTS' };
    }

    let newCom = await companyModel.addNewCompany(data);

    return {message: 'SUCCESS', data: newCom};
}

let deleteCompanyById = async (id) => {
    let currCom = await companyModel.deleteCompanyById(id);

    if (!currCom) {
        return { message: 'COMPANY_NOT_FOUND' };
    }

    await companyModel.deleteCompanyById(id);

    return { message: 'SUCCESS' };
}

let getCompanyById = async (id) => {
    let currCom = await companyModel.getCompanyById(id);
    if (!currCom) {
        return { message: 'COMPANY_NOT_FOUND' };
    }

    return { message: 'SUCCESS', data: currCom };
}

let updateCompanyById = async (id, data) => {
    let currCom = await companyModel.getCompanyById(id);
    if (!currCom) {
        return { message: 'COMPANY_NOT_FOUND' };
    }

    let currComCodeDifferent = await companyModel.findCompanyByCode(data.c_code);
    if (currComCodeDifferent && (currComCodeDifferent.c_code !== currCom.c_code )) {
        return { message: 'COMPANY_EXISTS' };
    }

    await companyModel.updateCompanyById(id, data);

    return { message: 'SUCCESS' };
}

module.exports = {
    getAllCompanies,
    addNewCompany,
    deleteCompanyById,
    getCompanyById,
    updateCompanyById
}
