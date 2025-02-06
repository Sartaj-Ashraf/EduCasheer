import mongoose, { Schema } from "mongoose";

const SubscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,// Subscribing the channel
        ref: "User",
        required: true
    },
    channel: {
        type: Schema.Types.ObjectId,// Subscribed to the channel
        ref: "User",
        required: true
    },
},
    {
        timestamps: true
    })

export default mongoose.model("Subscription", SubscriptionSchema)