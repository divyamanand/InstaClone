import { Like } from "../models/like.model"
import { Media } from "../models/media.model"
import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import { asyncHandler } from "../utils/asyncHandler"

const addLike = asyncHandler(async (req, res) => {

    const {mediaId} = req.params
    const media = await Media.findById(mediaId)
    
    if (!media) {
        throw new ApiError(400, "media Not Found")
    }

    const currentUser = await User.findById(req.user?._id)

    if (!currentUser) {
        throw new ApiError(400, "Login to like a media")
    }

    const like = await Like.create({
        media: mediaId,
        likedBy: currentUser
    })

    if (!like) {
        throw new ApiError(400, "Can't like the media! Try again later")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, like, "You liked the media!")
    )
})

const getLikesCount = asyncHandler(async (req, res) => {
    const {mediaId} = req.params

    const media = await Media.findById(mediaId)

    if (!media) {
        throw new ApiError(400, "media does not exist")
    }

    const totalLikes = await media.countLikes()

    return res
    .status(200)
    .json(
        new ApiResponse(200, totalLikes, "Likes Counted")
    )
})

const getAllLikedUsers = asyncHandler(async (req, res) => {
    const {mediaId} = req.params

    const media = await Media.findById(mediaId)
                    .populate("likes")
                    .exec()

    if (!media) {
        throw new ApiError(400, "media does not exist")
    }

    const likedByUsers = media.likes.map(like => likedBy)

    if (!likedByUsers) {
        throw new ApiError(400, "Error fetchihg likes! Try again later")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, likedByUsers, "Users liked the post fetched succesfully!")
    )
})

export {
    addLike,
    getAllLikedUsers,
    getLikesCount
}
