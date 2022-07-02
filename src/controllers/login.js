import User from "../models/User.js"
import {handleUnauthorizedErr,handleBadRequestErr} from "../error/errUtil.js";
import StatusCode from "http-status-codes";
import asyncWrapper from "../middleware/asyncWrapper.js";
export default asyncWrapper (async (req, res, next) => {
    const { email, password } = req.body;
    // bad request
    if (!email || !password) {
        throw handleBadRequestErr("Email or password is missing");
    }
    const user = await User.findOne({ email });

    //unauthorized with no user found
    if (!user) {
        throw handleUnauthorizedErr("User not found");
    }
    const isMatch = await user.comparePassword(password);

    //unauthorized with wrong password
    if (!isMatch) {
        throw handleUnauthorizedErr("Password is incorrect");
    }
    const { _id,name } = user;
    res.status(StatusCode.OK).json({
        state:  `here u go ${name} ur logged in`, 
        id: _id,
        token: `${user.createAuthToken()}`,
    });
})