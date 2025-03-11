const categoryModel = require('./../models/category.model');
const productModel = require('./../models/product.model');
const productService = require('./../services/product.service');
const slugify = require('slugify');

/**
 * Store new one category into database
 * @param {json} dataCategory 
 */
let addNewCategory = async (dataCategory) => {
    let category = await categoryModel.findByName(dataCategory.c_name);

    if (category) {
       return { message: 'CATEGORY_EXISTS' };
    }
    
    if (dataCategory.c_parent === '') {
        delete dataCategory.c_parent;
    }

    dataCategory = {
        ...dataCategory,
        c_slug: slugify(dataCategory.c_name)
    }
    
    let addNewCate = await categoryModel.addNewCategory(dataCategory);
   

    return { message: 'SUCCESS', data: addNewCate };
}

/**
 * Get all category
 */
let getAllCategory = async () => {
    let allCate = await categoryModel.getAllCategory();

    return { message: 'SUCCESS', data: allCate };
}

/**
 * Get category by id
 * @param {string} id 
 */
let getByIdCategory = async (id) => {
    let cate = await categoryModel.getByIdCategory(id);

    if (!cate) {
        return { message:'CATEGORY_NOT_FOUND' };
    }

    return { message: 'SUCCESS', data: cate };
}

/**
 * Update category
 * @param {string} id 
 * @param {json} itemCate 
 */
let updateCategory = async (id, itemCate) => {
    let cate = await categoryModel.getByIdCategory(id);
    let currCate = await categoryModel.findByName(itemCate.c_name);

    if (currCate && (currCate.c_name !== cate.c_name)) {
        return { message: 'CATEGORY_EXISTS' };
    }

    if (!cate) {
        return { message: 'CATEGORY_NOT_FOUND' };
    }

    if (itemCate.c_parent === '') {
        delete itemCate.c_parent;
    }

    itemCate = {
        ...itemCate,
    }

    if (itemCate.c_name) {
        itemCate.c_slug = slugify(itemCate.c_name);
    }

    await categoryModel.updateCategory(id, itemCate);

    return { message: 'SUCCESS' };
}

/**
 * Delete category by id
 * @param {string} id 
 */
let deleteByIdCategory = async (id) => {

    let cate = await categoryModel.getByIdCategory(id);

    if (!cate) {
        return { message: 'CATEGORY_NOT_FOUND' };
    }

    let childCate = await categoryModel.countCateChildByParentId(id);
    
    if (childCate > 0) {
        return { message: 'PARENT_EXISTS' };
    }

    let products = await productModel.findProductByCateId(id);

    for (let i = 0; i < products.length; i++) {
        await productService.deleteByIdProduct(products[i]._id);
    }

    await categoryModel.deleteByIdCategory(id);
       
    return { message: 'SUCCESS' };
}


module.exports = {
    addNewCategory,
    getAllCategory,
    getByIdCategory,
    deleteByIdCategory,
    updateCategory
}