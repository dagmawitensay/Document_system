import express from "express";
import connectDB from "./infrastructure/database/db";


connectDB();
const app = express();


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is listeaning on port ${PORT}`)
})
