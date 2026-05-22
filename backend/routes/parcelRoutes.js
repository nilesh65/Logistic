import express from "express"
import { createParcel } from "../controllers/parcelController.js"
import { authLimiter } from "../middlewares/rateLimiter.js"
import { adminOnly, protect } from "../middlewares/authMiddleware.js"

const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Parcels
 *   description: Endpoints for managing parcels
 */

/**
 * @swagger
 * /api/parcels:
 *   post:
 *     summary: Create a new parcel (admin)
 *     tags: [Parcels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderName:
 *                 type: string
 *               senderPhone:
 *                 type: string
 *               senderAddress:
 *                 type: string
 *               receiverName:
 *                 type: string
 *               receiverPhone:
 *                 type: string
 *               receiverAddress:
 *                 type: string
 *               shipmentType:
 *                 type: string
 *                 enum: [national, international]
 *               originCity:
 *                 type: string
 *               destinationCity:
 *                 type: string
 *               deliveryType:
 *                 type: string
 *                 enum: [sameDay, overnight, standard]
 *               parcelCategory:
 *                 type: string
 *                 enum:
 *                   - document
 *                   - electronics
 *                   - fragile
 *                   - clothing
 *                   - food
 *                   - medicine
 *                   - cosmetics
 *                   - books
 *                   - small_package
 *               weight:
 *                 type: number
 *             example:
 *               senderName: "Abhishek Gupta"
 *               senderPhone: "+91 8900987654"
 *               senderAddress: Street 123, City A
 *               receiverName: "Rinku Singh"
 *               receiverPhone: "+918907765798"
 *               receiverAddress: Avenue 456, City B
 *               shipmentType: national
 *               originCity: Kolkata
 *               destinationCity: Siliguri
 *               deliveryType: sameDay
 *               parcelCategory: electronics
 *               weight: 2.5
 *     responses:
 *       201:
 *         description: Parcel created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/',protect,adminOnly,createParcel)


export default router