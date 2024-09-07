import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema({

    content: {
        type: String,
        trim: true,
        required: true,
    },

    media: {
        type: Schema.Types.ObjectId,
        ref: "Media"
    },

    commentBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    parentComment: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    },

},

{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
})

commentSchema.virtual("replies", {
    ref : "Comment",
    localField: "_id",
    foreignField: "parentComment"
})

commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = mongoose.model("Comment", commentSchema)