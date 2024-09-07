import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addAComment, addAReply, getPostComments, getRepliesOfComment } from "../controllers/comment.controller.js";

const router = Router()

router.route("/:mediaId/addComment").post(
    verifyJWT,
    addAComment
)

router.route("/:commentId/addReply").post(
    verifyJWT,
    addAReply
)

router.route("/:mediaId").get(
    getPostComments
)

router.route("/replies/:commentId").get(
    getRepliesOfComment
)

export default router