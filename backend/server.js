// const express = require('express');
import express from 'express';
import { connectDB } from "./config/db.js";
import Product from './models/product.model.js';

const app = express();

app.use(express.json()); //alows us to accept JSON data in the body

app.get('/api/products', async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({success: true, data: products});
	}catch (error) {
		console.log("Error in fetching products ", error.message);
		res.status(500).json({success: false, message: "Server Error"});
	}
});

app.post("/api/products", (req, res) => {
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
});

app.put("api/product/:id", async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	try {
		const updateProduct= await Product.findByIdAndUpdate(id, product, {new : true});
		res.status(200).json({success: true, data: updateProduct});
	}catch (error) {
		console.log("error updating product ", error.message);
		res.status(500).json({success: false, message: "server error"});
	}
})

app.delete("/api/products/:id", async (req, res) => {
	const { id } = req.params;

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({success: true, message: "Product deleted"});
	} catch (error) {
		console.log("error in deleting product ", error.message);
		res.status(404).json({success: false, message: "Product id does not exist"});
	}
});

app.listen(5000, () => {
	connectDB();
	console.log('Server started at http://localhost:5000 hello');
})

