import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/v1/categories", async (req, res) => {
    const books = [
    {
        id: 1,
        title: "Mathematics",
        content: "John Doe",
        
    },
    {
        id: 2,
        title: "English",
        content: "John Doe",
        
    },
    {
        id: 3,
        title: "Stats",
        content: "John Doe",
    },
    {
        id: 4,
        title: "Urdu",
        content: "John Doe",
    }];
    res.send(books);
});

app.listen(port, () => {
    console.log(`Server running on port https://localhost:${port}`); 
});