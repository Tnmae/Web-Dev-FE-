import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProduct = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({success: true, data: products});
	}catch (error) {
		console.log("Error in fetching products ", error.message);
		res.status(500).json({success: false, message: "Server Error"});
	}
};

export const createProduct= (req, res) => {
	const product= req.body;

	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({success: false, message: "Please provide all fields"});
	}

	const newProduct= new Product(product);

	try {
		newProduct.save();
		return res.status(201).json({success: true, data: newProduct});
	}catch (error) {
		console.error("Error in creating product: ", error.message);
		res.status(500).json({success: false, message: "server error"});
	}
};


export const updateProduct= async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({success: false, message: "Invalid Product ID"});
	}

	try {
		const updateProduct= await Product.findByIdAndUpdate(id, product,{new:true});
		console.log("product updated");	
		res.status(200).json({success: true, data: updateProduct});
	}catch (error) {
		console.log("error updating product ", error.message);
		res.status(500).json({success: false, message: "server error"});
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return req.status(404).json({success: false, message: "Invalid Product ID"});
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({success: true, message: "Product deleted"});
	} catch (error) {
		console.log("error in deleting product ", error.message);
		res.status(500).json({success: false, message: "Server Error"});
	}
};