import { getUser, updateUser, deleteUser, getAllUsers, followUser, unfollowUser } from "../controller/UserController"; 
const userRouter = require('express').Router();
import verifyToken from "../middleware/auth";


userRouter.get("/", verifyToken, getAllUsers);
userRouter.get("/:username", verifyToken, getUser);
userRouter.post("/update/:username", verifyToken, updateUser);
userRouter.delete("/delete/:username", verifyToken, deleteUser);
userRouter.post("/follow/:username", verifyToken, followUser);
userRouter.post("/unfollow/:username", verifyToken, unfollowUser);





export default userRouter;
