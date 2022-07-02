import Job from "../../models/Job.js";
import StatusCodes from 'http-status-codes'; 
import asyncWrapper from "../../middleware/asyncWrapper.js";
export default asyncWrapper(async (req, res, next) => {
    const User = req.body
    User.createdBy = req.user.user_id;
    const job = await Job.create(User);
    res.status(StatusCodes.CREATED).json(job);
})