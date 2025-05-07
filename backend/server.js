// const express = require('express');
import express from 'express';
import { connectDB } from "./config/db.js";
import Product from './models/product.model.js';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); //alows us to accept JSON data in the body

app.use('/api/products', productRoutes);

app.listen(PORT, (req,res) => {
	connectDB();
	console.log('Server started at http://localhost:' + PORT);
})
