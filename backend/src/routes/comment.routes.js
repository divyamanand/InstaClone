import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { addAComment, getPostComments, getRepliesOfComment } from "../controllers/comment.controller";

const router = Router()

router.route("/addComment").post(
    verifyJWT,
    addAComment
)

router.route("/comment/:mediaId").get(
    getPostComments
)

router.route("/comment/:commentId").get(
    getRepliesOfComment
)

export default router