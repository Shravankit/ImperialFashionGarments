import mongoose from "mongoose";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const categoryController = async (req, res) => {
    try {
        const {name} = req.body;
        if(!name)
        {
            return res.status(401).send({message: 'Category Name is Required'});
        }

        //existing category name
        const existingCategory = await categoryModel.findOne({name});

        if(existingCategory)
        {
           return res.status(200).send({
                success: true,
                message: 'Category already exists',
            });
        }

        const category = await new categoryModel({name, slug:slugify(name)}).save();

        res.status(201).send({
            success: true,
            message: 'Category Created Succesfully',
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Category',
        });
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new: true});
        res.status(200).send(
            {
                success: true,
                message: 'Update Succesful',
                category,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Update'
            }
        );
    }
};

export const allCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).send(
            {
                success: true,
                message: 'Fetched All Categories',
                categories,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'getting categories false',
            }
        )
    }
}


// get one category
export const oneCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({slug: req.params.slug});
        res.status(201).send(
            {
                success: true,
                message: 'Get Single Category Succesful',
                category,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Get Single Category Failed',
            }
        )
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
                success: true,
                message: 'Category Deleted Succesfully',}
                );
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Delete Category failed',
                error,
            }
        )
    }
}