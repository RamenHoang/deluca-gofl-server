const categoryService = require('./../services/category.service');

let addNewCategory = async (req, res) => {

    try {
        let dataCategory = req.body;
        let addNewCate = await categoryService.addNewCategory(dataCategory);

        return res.status(200).json(addNewCate);
    } catch (error) {   
        return res.status(500).json(error);
    }
}

let getAllCategory = async (req, res) => {
    try {
        let allCategory = await categoryService.getAllCategory();
        
        return res.status(200).json(allCategory);
    } catch (error) {   
        return res.status(500).json(error);
    }
}

let deleteCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let deleteCate = await categoryService.deleteByIdCategory(id);

        return res.status(200).json(deleteCate);
    } catch (error) {   
        return res.status(500).json(error);
    }
}

let updateCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let itemCate = req.body;
        let updateCate = await categoryService.updateCategory(id, itemCate);

        return res.status(200).json(updateCate);
    } catch (error) {
        
    }
}

let getByIdCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let cate = await categoryService.getByIdCategory(id);

        return res.status(200).json(cate);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    addNewCategory,
    getAllCategory,
    deleteCategory,
    updateCategory,
    getByIdCategory
}
