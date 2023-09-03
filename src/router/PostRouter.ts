const postRouter = require('express').Router();
import verifyToken from "../middleware/auth";

import { createPost, deletePost, getPostById, getSelfPosts, getTimelinePosts, likePost, updatePost } from "../controller/PostController";


postRouter.get("/:postId", verifyToken, getPostById);
postRouter.post("/self", verifyToken, getSelfPosts);
postRouter.post("/timeline", verifyToken, getTimelinePosts);
postRouter.post("/create", verifyToken, createPost);
postRouter.post("/update/:postId", verifyToken, updatePost);
postRouter.delete("/delete/:postId", verifyToken, deletePost);
postRouter.post("/like/:postId", verifyToken, likePost);


export default postRouter;