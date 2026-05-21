import mongoose from "mongoose"

const checkPointSchema = new mongoose.Schema(
    {
        location: {
        type: String,
        required: true,
        trim: true,
        },
        title: {
        type: String,
        required: true,
        trim: true,
        },
        description: {
        type: String,
        trim: true,
        },
        status: {
        type: String,
        enum: ["arrived", "in_transit", "out_for_delivery", "delivered"],
        required: true,
        },
        timestamps: {
        type: Date,
        default: Date.now,
        },
        updatedBy: {
        type: String,
        required: true,
        trim: true,
        }
    },{
        _id: false
    }
)

const parcelSchema = new mongoose.Schema(
    {
        trackingId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        senderName: {
            type: String,
            required: true,
            trim: true,
        },
        senderPhone: {
            type: String,
            required: true,
            trim: true
        },
        senderAddress: {
            type: String,
            required: true,
            trim: true
        },
            receiverName: {
            type: String,
            required: true,
            trim: true,
        },
        receiverPhone: {
            type: String,
            required: true,
            trim: true
        },
        receiverAddress: {
            type: String,
            required: true,
            trim: true
        },
        shipmentType: {
            type: String,
            required: true,
            enum: ["national", "international"]
        },
        originCity: {
            type: String,
            required: true,
            trim: true
        },
        destinationCity: {
            type: String,
            required: true,
            trim: true
        },
        deliveryType: {
            type: String,
            required: true,
            enum: ["sameDay", "overnight","standard"]
        },
        parcelCategory: {
            type: String,
            required: true,
            enum: ["document", "electronics", "fragile", "clothing", "food", "medicine", "cosmetics", "books", "small_package", "large_package"],
            trim: true
        },
        weight: {
            type: Number,
            required: true,
            min: 0
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        checkPoints: [checkPointSchema],
    },
    {
        timestamps: {createdAt: true, updatedAt: false},
    },
)

export const Parcel = mongoose.model("Parcel", parcelSchema)