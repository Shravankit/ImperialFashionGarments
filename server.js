import express from "express";
import colors from "colors";
import morgan from "morgan";
// import mongoose from "mongoose";
import authRoutes from "./Routes/authRoutes.js";
import categoryRoute from "./Routes/categoryRoute.js";
import productRoute from "./Routes/productRoute.js";
import connectDB from "./databaseConn/db.js";
import dotenv from "dotenv";
import cors from "cors";

//config dotenv
// if there is another path    dotenv.config("./path");
dotenv.config();

// express
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//routes
app.use('/api/v1/auth', authRoutes);

//category routes
app.use('/api/v1/category', categoryRoute);

//product routes
app.use('/api/v1/product', productRoute);

//rest api
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome'
    })
})

//port
const PORT = process.env.PORT || 3001;

//mongooseConnection
connectDB();

// console.log(`${db}` .bgGreen.white);

app.listen(PORT, () => {
    console.log(`server is running on ${process.env.DEV_MODE} mode on port ${PORT}` .bgCyan.white);
})