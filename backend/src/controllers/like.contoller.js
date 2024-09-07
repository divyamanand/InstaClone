import { Like } from "../models/like.model"
import { Media } from "../models/media.model"
import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import { asyncHandler } from "../utils/asyncHandler"

const likeMedia = asyncHandler(async (req, res) => {
    const { mediaId } = req.params;
    const media = await Media.findById(mediaId);
    
    if (!media) {
        throw new ApiError(400, "Media not found");
    }

    const currentUser = req.user;

    if (!currentUser) {
        throw new ApiError(400, "Login to like media");
    }

    const like = await Like.create({
        media: mediaId,
        likedBy: currentUser._id,
    });

    if (!like) {
        throw new ApiError(400, "Can't like the media! Try again later");
    }

    return res.status(200).json(
        new ApiResponse(200, like, "You liked the media!")
    );
});

const getMediaLikesCount = asyncHandler(async (req, res) => {
    const { mediaId } = req.params;
    const media = await Media.findById(mediaId);

    if (!media) {
        throw new ApiError(400, "Media does not exist");
    }

    const totalLikes = await Like.countDocuments({ media: mediaId });

    return res.status(200).json(
        new ApiResponse(200, totalLikes, "Likes counted successfully")
    );
});

const getMediaLikedUsers = asyncHandler(async (req, res) => {
    const { mediaId } = req.params;
    const media = await Media.findById(mediaId)
        .populate({ path: "likes", populate: { path: "likedBy" } })
        .exec();

    if (!media) {
        throw new ApiError(400, "Media does not exist");
    }

    const likedByUsers = media.likes.map(like => like.likedBy);

    return res.status(200).json(
        new ApiResponse(200, likedByUsers, "Users who liked the media fetched successfully!")
    );
});

const likeComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
        throw new ApiError(400, "Comment not found");
    }

    const currentUser = req.user;

    if (!currentUser) {
        throw new ApiError(400, "Login to like comment");
    }

    const like = await Like.create({
        comment: commentId,
        likedBy: currentUser._id,
    });

    if (!like) {
        throw new ApiError(400, "Can't like the comment! Try again later");
    }

    return res.status(200).json(
        new ApiResponse(200, like, "You liked the comment!")
    );
});

const getCommentLikesCount = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(400, "Comment does not exist");
    }

    const totalLikes = await Like.countDocuments({ comment: commentId });

    return res.status(200).json(
        new ApiResponse(200, totalLikes, "Likes counted successfully")
    );
});

const getCommentLikedUsers = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId)
        .populate({ path: "likes", populate: { path: "likedBy" } })
        .exec();

    if (!comment) {
        throw new ApiError(400, "Comment does not exist");
    }

    const likedByUsers = comment.likes.map(like => like.likedBy);

    return res.status(200).json(
        new ApiResponse(200, likedByUsers, "Users who liked the comment fetched successfully!")
    );
});

export {
    likeMedia,
    getMediaLikesCount,
    getMediaLikedUsers,
    likeComment,
    getCommentLikesCount,
    getCommentLikedUsers
}
