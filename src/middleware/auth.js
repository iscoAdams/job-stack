import {handleUnauthorizedErr} from "../error/errUtil.js";
import asyncWrapper from "./asyncWrapper.js";
import jwt from "jsonwebtoken";
// import User from "../models/User.js";
export default asyncWrapper(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader||!authHeader.startsWith("Bearer ")) {
        throw handleUnauthorizedErr("not authorized");
    }
    const token = authHeader.split(" ")[1];
    const payload =  jwt.verify(token, process.env.JWT_SECRET);
    /*const user = await User.findByToken(payload);
    const user = User.findById(payload._id).select("-password");
    req.user = user;*/
    req.user = {name: payload.name, user_id: payload._id};
    next();
});


