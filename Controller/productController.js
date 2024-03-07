import productModel from "../models/productModal.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({message: 'Require Product Name'});
            
            case !description:
                return res.status(500).send({message: 'Require Product Description'});
            
            case !price:
                return res.status(500).send({message: 'Require Product Price'});

            case !category:
                return res.status(500).send({message: 'Require Product Category'});
            
            case !quantity:
                return res.status(500).send({message: 'Require Product Quantity'});

            case photo && photo.size > 1000000:
                return res.status(500).send({message: 'Require Product Photo and Photo Should be Less Than 1MB'});
        }

        const product = new productModel({...req.fields, slug: slugify(name)});

        if(photo)
        {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type
        }

        await product.save();

        res.status(200).send(
            {
                success: true,
                message: "Product Created Successfully",
                product,
            }
        );
        
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Product Creation',
                error,
            }
        )
    }
}

export const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({CreatedAt: -1});
        res.status(200).send(
            {
                success: true,
                totalCount: products.length,
                message: 'Fetched all products',
                products,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Getting Products',
                error,
            }
        )
    }
};

export const getSingleProduct = async (req, res) => {
    try {
        const oneProduct = await productModel.findOne({slug: req.params.slug}).populate('category').select("-photo").limit(12).sort({CreatedAt: -1});
        await res.status(200).send(
            {
                success: true,
                message: 'Succesfully Fetched',
                oneProduct
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Getting a Product',
                error,
            }
        )   
    }
}

export const getProductPhotoController = async (req, res) => {
    try {
        const productPhoto = await productModel.findById(req.params.pid).select('photo');
        if(productPhoto.photo.data)
        {
            res.set('Content-type', productPhoto.photo.contentType);
            res.status(201).send(productPhoto.photo.data);
        }
    } catch (error) {
        res.status(500).send(
            {
                success: true,
                message: 'Error in Getting Product Photo',
                error,
            }
        )
    }
};

export const deleteProductController = async (req, res) => {
    try {
        const deleteProduct = await productModel.findByIdAndDelete(req.params.pid).select('-photo');
        res.status(201).send(
            {
                success: true,
                message: 'Succesfully deleted',
                deleteProduct,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Deleting Product',
                error,
            }
        )
    }
};

export const updateProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({message: 'Require Product Name'});
            
            case !description:
                return res.status(500).send({message: 'Require Product Description'});
            
            case !price:
                return res.status(500).send({message: 'Require Product Price'});

            case !category:
                return res.status(500).send({message: 'Require Product Category'});
            
            case !quantity:
                return res.status(500).send({message: 'Require Product Quantity'});

            case photo && photo.size > 1000000:
                return res.status(500).send({message: 'Require Product Photo and Photo Should be Less Than 1MB'});
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug: slugify(name)}, {new: true});  

        if(photo)
        {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type
        }

        await product.save();

        res.status(200).send(
            {
                success: true,
                message: "Product Updated Successfully",
                product,
            }
        );
        
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Product Update',
                error,
            }
        )
    }
}

//product filter controller
export const productFilterController = async (req, res) => {
    try {
        const {checked, radio} = req.body;

        let args = {}
        if(checked.length > 0) args.category = checked;
        if(radio.length) args.price = {$gte: radio[0], $lte: radio[1]};

        const products = await productModel.find(args);
        res.status(200).send(
            {
                success: true,
                message: "Filter Applied",
                products,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: "Error in Product Filter",
                error, 
            }
        )
    }
}

//product count controller
export const produtCountController = async (req, res) => {
    try {
       const total = await productModel.find({}).estimatedDocumentCount();
       res.status(200).send(
        {
            success: true,
            message: 'Fetched Products up to count',
            total,
        }
       );
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Product Count',
                error,
            }
        )
    }
}

//product per page controller
export const productPerPageController = async (req, res) => {
    try {
      const perPage = 6
      const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).select('-photo').skip((page - 1) * perPage).limit(perPage).sort({CreatedAt: -1});
        res.status(200).send(
            {
                status: true,
                message: 'Fetched products per page',
                products,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'error in fetching products',
                error,
            }
        )
    }
}

//search product controller
export const searchProductController = async (req, res) => {
    try {
        const {keyword} = req.params;
        const result = await productModel.find({
            $or: [
                {name: {$regex: keyword, $options: 'i'}},
                {description: {$regex: keyword, $options: 'i'}},
            ]
        }).select("-photo");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Searching message',
                error,
            }
        )
    }
}

//similar product controller
export const similarProductController = async (req, res) => {
    try {
        const {pid, cid} = req.params;
        const products = await productModel.find({
            category: cid,
            _id: {$ne: pid},
        }).select('-photo').limit(3).populate("category");

        res.status(200).send({
            success: true,
            message: "Found Similar Products",
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Getting Similar Products',
                error,
            }
        )
    }
}