import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



import userRouter from './routes/user.routes.js';
import quoteRouter from './routes/quote.routes.js';
import productRouter from './routes/product.routes.js';
import errorHandler from "./middlewares/errorHandler.middleware.js";

app.use((req, res, next) => {
    res.on("finish", () => {
        console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode}`);
    });
    next();
});

app.use("/api/v1/is-healthy", (req, res) => {
    res.status(200).json({message: "Server is healthy"})
})

app.use("/api/v1/user", userRouter)
app.use("/api/v1/quote", quoteRouter)
app.use("/api/v1/product", productRouter)

app.use(errorHandler)

export { app }