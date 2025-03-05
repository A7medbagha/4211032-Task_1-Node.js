const { default: slugify } = require("slugify");
const categoryModel = require("../Models/categoryModel");
const asyncHandler = require('express-async-handler');

exports.getCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    const categories = await categoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({results: categories.length, data: categories});
});


exports.getCategorybyID = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    if(!category){
        res.status(404).json({msg: `No category for this id ${id}`});
    }
    res.status(200).json({ data: category });
});


exports.createCategories = asyncHandler(async(req, res)=> {
    const name = req.body.name;
    const category = await categoryModel.create({name, slug: slugify(name)});
     res.status(201).json({data: category});
});


exports.updateCategoryByID = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = await categoryModel.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true}
    );

    if(!category){
        res.status(404).json({msg: `No category for this id ${id}`});
    }
    res.status(200).json({ data: category });
});

exports.deleteCategoryByID = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);

    if(!category){
        res.status(404).json({msg: `No category for this id ${id}`});
    }
    res.status(200).json({ data: category });
});




