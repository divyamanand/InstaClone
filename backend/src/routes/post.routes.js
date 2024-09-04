import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { 
    archivePost, 
    deletePost, 
    editPost, 
    getAllPostsofUser, 
    getPostComments, 
    pinAPost, 
    publishPost, 
    unArchivePost,
    unPinAPost} 
    from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/publish").post(
    verifyJWT,
    upload.single("mediaFile"),
    publishPost)

router.route("/getAllPosts").get(
    verifyJWT,
    getAllPostsofUser)

router.route("/edit/:mediaId").patch(
    verifyJWT, 
    editPost)

router.route("/delete/:mediaId").delete(
    verifyJWT,
    deletePost
)

router.route("/archive/:mediaId").patch(
    verifyJWT,
    archivePost
)

router.route("/unarchive/:mediaId").patch(
    verifyJWT,
    unArchivePost
)

router.route("/pin/:mediaId").patch(
    verifyJWT,
    pinAPost
)

router.route("/unpin/:mediaId").patch(
    verifyJWT,
    unPinAPost
)

export default router