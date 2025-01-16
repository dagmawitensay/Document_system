import express from "express";
import connectDB from "./infrastructure/database/db";
import { documentRoutes } from "./interface/routers/DocumentRoutes";
import { userRoutes } from "./interface/routers/UserRoutes";


connectDB();
const app = express();
app.use(express.json())
app.use("/api/documents", documentRoutes)
app.use("/api/authenticate", userRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is listeaning on port ${PORT}`)
})
