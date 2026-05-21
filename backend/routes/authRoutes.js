import express from "express"
import { addUser, login } from "../controllers/authController.js"
import { authLimiter } from "../middlewares/rateLimiter.js"
import { adminOnly, protect } from "../middlewares/authMiddleware.js"

const router = express.Router()
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Admin Login
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                          password:
 *                              type: string
 *                              format: email
 *      responses:
 *          200:
 *              description: Login Successful
 *          400:
 *              description: Validation error
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Forbidden
 */
router.post('/login',authLimiter,login)

/**
 * @swagger
 * /api/auth/add-user:
 *  post:
 *      summary: Add New Admin User
 *      tags: [Authentication]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - email
 *                          - password
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                              format: email
 *                          password:
 *                              type: string
 *                              format: email
 *      responses:
 *          201:
 *              description: Successful user creation, returns user info
 *          400:
 *              description: Validation error
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Forbidden
 */
router.post("/add-user",protect,adminOnly,addUser)

export default router