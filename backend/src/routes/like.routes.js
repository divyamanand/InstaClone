import { Router } from "express";
import { getCommentLikedUsers, 
    getCommentLikesCount, 
    getMediaLikedUsers, 
    getMediaLikesCount, 
    likeComment, 
    likeMedia } from "../controllers/like.contoller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/media/like/:mediaId").post(
    verifyJWT,
    likeMedia
)

router.route("/media/totalLikes/:mediaId").get(
    getMediaLikesCount
) 

router.route("/media/likedBy/:mediaId").get(
    getMediaLikedUsers
) 

router.route("/comment/like/:commentId").post(
    verifyJWT,
    likeComment
)

router.route("/comment/totalLikes/:commentId").get(
    getCommentLikesCount
) 

router.route("/comment/likedBy/:commentId").get(
    getCommentLikedUsers
) 

export default router