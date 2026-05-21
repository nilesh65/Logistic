import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import compression from "compression"
import dotenv from "dotenv"
import swaggerUI from "swagger-ui-express"
import cookieParser from "cookie-parser"
import { swaggerSpec } from "./config/swagger.js"
import { notFoundHandler,errorHandler } from "./middlewares/errorHandler.js"
import {globalLimiter, authLimiter} from "./middlewares/rateLimiter.js"
//Router files
import authRoutes from "./routes/authRoutes.js"
dotenv.config()
export const app = express()

app.use(cookieParser())
app.use(helmet())
app.use(cors())
app.use(morgan("dev"))
app.use(compression())
app.use(express.json())
app.use("/api/docs",swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use(globalLimiter)
app.get("/health",(req,res)=>{
    res.status(200).json({status: "ok", message: "Server is healthy"})
})
app.use("/api/auth",authRoutes)
app.use(notFoundHandler)
app.use(errorHandler)