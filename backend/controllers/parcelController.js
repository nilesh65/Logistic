import {Parcel} from "../models/Parcel.js"
import { calculateCost } from "../services/calculateCost.js"
import { generateTrackingId } from "../services/generateTrackingId.js"
import { createParcelSchema } from "../validations/validations.js"

export const createParcel = async (req, res, next)=> {
    try {
        const { error, value} = createParcelSchema.validate(req.body)

        if(error){
            return res.status(400).json({message: error.details[0].message})
        }
        const priceInfo = calculateCost({
            originCity: value.originCity,
            destinationCity: value.destinationCity,
            shipmentType: value.shipmentType,
            parcelCategory: value.parcelCategory,
            weight: value.weight,
            deliveryType: value.deliveryType
        })
        let trackingId = generateTrackingId()
        if(!trackingId){
            return res.status(500).json({message: "Failed to generate unique tracking ID"})
        }
        const parcel =await Parcel.create({
            ...value,
            trackingId,
            price: priceInfo.price,
            checkpoints: [
                {
                    location: value.originCity,
                    status: "arrived",
                    title: `Parcel arrived at ${value.originCity} Branch`,
                    description: `Your parcel has arrived at our ${value.originCity} branch and is being processed for the next step in it's journey`,
                    updatedBy: req.user? req.user.name : "system",
                }
            ]
        })
        res.status(201).json(parcel)
    } catch (error) {
        next(error)
    }
}
export const getParcelByTrackingId = async (req, res, next) => {
try {
const { trackingId } = req.params;
const parcel = await Parcel.findOne({ trackingId });

if (!parcel) {
return res.status(404).json({ message: "Parcel not found" });
}
res.status(200).json(parcel);
} catch (error) {
next(error);
}
    }