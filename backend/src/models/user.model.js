import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    
    avatar: {
        type: String, // Cloudinary URL
        required: true,
    },
    
    coverImage: {
        type: String,
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Media"
        }
    ],
    
    archive: [
        {
            type: Schema.Types.ObjectId,
            ref: "Media"
        }
    ],

    highlights: [
        {
            type: Schema.Types.ObjectId,
            ref: "Media"
        }
    ],

    pinnedPosts: {
        type: [Schema.Types.ObjectId],
        ref: "Media",
        validate: {
            validator: function(val) {
                return val.length <= 3;
            },
            message: "Pinned posts cannot exceed 3"
        }
    },

    refreshToken: {
        type: String,
    }
}, 
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.virtual("allPosts", {
    ref: "Media",
    localField: "_id",
    foreignField: "owner"
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
};

userSchema.methods.sendToArchive = function (postId) {

    if (!(this.posts.includes(postId))) {
        throw new ApiError(400, "Post does not exist")
    }

    this.posts.pull(postId);
    this.archive.push(postId);
};

userSchema.methods.unArchive = function (postId) {

    if (!(this.archive.includes(postId))) {
        throw new ApiError(400, "Post does not exist")
    }

    this.posts.push(postId);
    this.archive.pull(postId);
};

userSchema.methods.pinPost = function (postId) {
    
    if (!(this.posts.includes(postId))) {
        throw new ApiError(400, "Post does not exist")
    }

    this.posts.pull(postId);
    this.pinnedPosts.push(postId);
};

userSchema.methods.unPinPost = function (postId) {

    if (!(this.pinnedPosts.includes(postId))) {
        throw new ApiError(400, "Post does not exist")
    }

    this.posts.push(postId);
    this.pinnedPosts.pull(postId);
};

export const User = mongoose.model("User", userSchema);
