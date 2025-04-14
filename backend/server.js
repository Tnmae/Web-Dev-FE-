// const express = require('express');
import express from 'express';
import { connectDB } from "./config/db.js";
import Product from './models/product.model.js';

const app = express();

app.use(express.json()); //alows us to accept JSON data in the body

app.get('/', (req, res) => {
	res.send('server is ready');
})

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
		console.error("Error in creating product: ", error);
		res.status(500).json({success: false, message: "server error"});
	}
});

app.delete("/api/products/:id", async (req, res) => {
	const { id } = req.params;

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({success: true, message: "Product deleted"});
	} catch (error) {
		res.status(404).json({success: false, message: "Product id does not exist"});
	}
});

app.listen(5000, () => {
	connectDB();
	console.log('Server started at http://localhost:5000 hello');
})

