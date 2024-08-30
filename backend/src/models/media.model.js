import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const mediaSchema = new Schema({

    mediaFile: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: "",
        trim: true
    },

    views: {
        type: Number,
        default: 0
    },

    isPublished: {
        type: Boolean,
        default: true
    },

    location: {
        type: String,
        default: ""
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

} , 
{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
})

mediaSchema.methods.countLikes = async function () {
    
    const like = mongoose.model("Like")
    const count = await like.countDocuments({media: this._id})
    return count
}

mediaSchema.methods.countShares = async function () {
    const share = mongoose.model("Share")
    const count = await share.countDocuments({media: this._id})
    return count
}

mediaSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "media",
})

mediaSchema.virtual("likes", {
    ref: "Like",
    localField: "_id",
    foreignField: "media"
})


mediaSchema.plugin(mongooseAggregatePaginate)

export const Media = mongoose.model("Media", mediaSchema)