import mongoose, { Schema } from "mongoose";


const likeSchema = new Schema({
    media: {
        type: Schema.Types.ObjectId,
        ref: "Media",
        default: null
    },

    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    },

    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true})

export const Like = mongoose.model("Like", likeSchema)