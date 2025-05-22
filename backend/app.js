import express from "express";
import dotenv from "dotenv";
import filesRoutes from "./routes/filesRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/files", filesRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


