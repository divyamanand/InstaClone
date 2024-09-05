import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Media } from "../models/media.model.js"


const addAComment = asyncHandler(async (req, res) => {

    const {content} = req.body
    const {mediaId, commentId} = req.params

    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new ApiError(400, "Login to comment")
    }
    
    if (!content) {
        throw new ApiError(400, "Content is required")
    }

    const comment = await Comment.create({
        content: content,
        media: mediaId,
        commentBy: req.user._id,
        parentComment: commentId || null
    })

    if (!comment) {
        throw new ApiError(400, "No proper content to comment")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, comment, "Comment posted successfully")
    )
})

const addAReply = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const { commentId } = req.params;

    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new ApiError(400, "Login to comment")
    }

    if (!content) {
        throw new ApiError(400, "Content is required");
    }

    const parentComment = await Comment.findById(commentId)

    if (!parentComment) {
        throw new ApiError(400, "Select a comment to reply")
    }

    const comment = await Comment.create({
        content: content,
        media: parentComment.media._id,
        commentBy: req.user._id,
        parentComment: commentId
    });

    return res.status(201).json(
        new ApiResponse(201, comment, "Reply posted successfully")
    );
});

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

// const likeAComment = asyncHandler(async (req, res) => {

//     const {commentId} = req.params
//     const comment = await Comment.findById(commentId)
    
//     if (!comment) {
//         throw new ApiError(400, "Comment Not Found")
//     }

//     const currentUser = await User.findById(req.user?._id)

//     if (!currentUser) {
//         throw new ApiError(400, "Login to like a comment")
//     }

//     const like = await Like.create({
//         comment: commentId,
//         likedBy: currentUser
//     })

//     if (!like) {
//         throw new ApiError(400, "Can't like the Comment! Try again later")
//     }

//     return res
//     .status(200)
//     .json(
//         new ApiResponse(200, like, "You liked the Comment!")
//     )
// })

const getRepliesOfComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId)
        .populate("replies")  // Ensure that replies are populated
        .exec();

    if (!comment) {
        throw new ApiError(400, "Comment not found");
    }

    return res.status(200).json(
        new ApiResponse(200, comment.replies, "Replies fetched successfully")
    );
});


export {
    addAComment,
    getRepliesOfComment,
    getPostComments,
    addAReply
}

