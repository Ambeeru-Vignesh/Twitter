import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";


const app=express();
dotenv.config();

app.use(express.json());

