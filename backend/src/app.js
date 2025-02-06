import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credential: true
// }))
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend to access backend
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from "./routes/user.routes.js"

// Routes declaration
app.use("/api/v1/users", userRouter)

// https://localhost:5000/api/v1/user/register
export { app }