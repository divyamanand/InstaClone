import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { Media } from "../models/media.model.js"
import { User } from "../models/user.model.js"

const publishPost  = asyncHandler(async (req, res) => {

    const {description, location} = req.body

    const fileLocalPath = req.file?.path

    if (!fileLocalPath) {
        throw new ApiError(400, "File is required to create a post")
    }

    const postFile = await uploadOnCloudinary(fileLocalPath)

    if (!postFile.url) {
        throw new ApiError(400, "Post file is required, error uploading file!")
    }

    const postOwner = await User.findById(req.user?._id)

    if (!postOwner) {
        throw new ApiError(401, "Login to create post")
    }

    const post = await Media.create({
        mediaFile: postFile.url,
        description: description || "",
        location: location || "",
        owner: postOwner._id
    })

    if (!post) {
        throw new ApiError(400, "Something Went Wrong While Creating Your Post")
    }

    postOwner.posts.push(post._id); 

    await postOwner.save();

    return res
    .status(201)
    .json(
        new ApiResponse(201, post, "Post Created Successfully")
    )
})

const editPost = asyncHandler(async (req, res) => {

    const {description, location} = req.body
    const {mediaId} = req.params

    const post = await Media.findById(mediaId)

    if (!post) {
        throw new ApiError(400, "Unable to find the post")
    }

    if (!post.owner.equals(req.user._id)) {
        throw new ApiError(403, "You are not authorised to edit this post!")
    }

    const updatedPost = await Media.findByIdAndUpdate(mediaId, 
        {
            $set: {
                description,
                location
            }
        },
        {new: true},
    )

    if (!updatedPost) {
        throw new ApiError(500, "Unable to update the post")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, updatedPost, "Post updated successfully")
    )

})

const deletePost = asyncHandler(async (req, res) => {
    const { mediaId } = req.params;

    const post = await Media.findById(mediaId);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (!post.owner.equals(req.user._id)) {
        throw new ApiError(403, "You are not authorized to delete this post");
    }

    await Media.findByIdAndDelete(mediaId);

    return res
    .status(204)
    .send()
    .json(204, {}, "Post deleted successfully");
});


const archivePost = asyncHandler(async (req, res) => {

    const {mediaId} = req.params

    if (!mediaId) {
        throw new ApiError(400, "Unable to locate the post! Archive process failed")
    }

    const post = await Media.findById(mediaId)

    if (!post) {
        throw new ApiError(400, "Post doesn't exist")
    }

    const postOwner = await User.findById(post?.owner)

    if (!postOwner) {
        throw new ApiError(400, "Unable to find posts owner")
    }

    if (!post.owner.equals(req.user._id)) {
        throw new ApiError(403, "You are not authorized to delete this post");
    }

    await postOwner.sendToArchive(mediaId)
    await postOwner.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200, postOwner, "Post is now archived")
    )
})


const unArchivePost = asyncHandler(async (req, res) => {

    const {mediaId} = req.params

    if (!mediaId) {
        throw new ApiError(400, "Unable to locate the post! Archive process failed")
    }

    const post = await Media.findById(mediaId)

    if (!post) {
        throw new ApiError(400, "Post doesn't exist")
    }

    const postOwner = await User.findById(post?.owner)

    if (!postOwner) {
        throw new ApiError(400, "Unable to find posts owner")
    }

    if (!post.owner.equals(req.user._id)) {
        throw new ApiError(403, "You are not authorized to delete this post");
    }

    await postOwner.unArchive(mediaId)
    await postOwner.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200, postOwner, "Post is now unArchived")
    )
})

const pinAPost = asyncHandler(async (req, res) => {

    const {mediaId} = req.params

    if (!mediaId) {
        throw new ApiError(400, "Unable to locate the post! Archive process failed")
    }

    const post = await Media.findById(mediaId)

    if (!post) {
        throw new ApiError(400, "Post doesn't exist")
    }

    const postOwner = await User.findById(post?.owner)

    if (!postOwner) {
        throw new ApiError(400, "Unable to find posts owner")
    }

    if (!post.owner.equals(req.user._id)) {
        throw new ApiError(403, "You are not authorized to delete this post");
    }

    await postOwner.pinPost(mediaId)
    await postOwner.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200, post, "Post is now pinned")
    )
})

const unPinAPost = asyncHandler(async (req, res) => {

    const {mediaId} = req.params

    if (!mediaId) {
        throw new ApiError(400, "Unable to locate the post! Archive process failed")
    }

    const post = await Media.findById(mediaId)

    if (!post) {
        throw new ApiError(400, "Post doesn't exist")
    }

    const postOwner = await User.findById(post?.owner)

    if (!postOwner) {
        throw new ApiError(400, "Unable to find posts owner")
    }

    if (!post.owner.equals(req.user._id)) {
        throw new ApiError(403, "You are not authorized to delete this post");
    }

    await postOwner.unPinPost(mediaId)
    await postOwner.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200, post, "Post is now unpinned")
    )
})

const getPostComments = asyncHandler(async (req, res) => {

    const {mediaId} = req.params

    const post = await Media.findById(mediaId)
                .populate("comments")
                .exec()

    if (!post) {
        throw new ApiError(400, "Unable to Find The Post")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, post.comments, "Post Comments Fetched Successfully")
    )
})

const getAllPostsofUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).populate("allPosts").exec()
    
    if (!user) {
        throw new ApiError(400, "No User Found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, user.allPosts, "Posts fetched successfully")
    )
})

export {
    publishPost,
    editPost,
    deletePost,
    archivePost,
    unArchivePost,
    pinAPost,
    unPinAPost,
    getPostComments,
    getAllPostsofUser
}