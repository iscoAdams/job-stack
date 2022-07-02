import StatusCodes  from "http-status-codes";
import asyncWrapper from "../../middleware/asyncWrapper.js";
import Job from "../../models/Job.js";
import {handlenotFoundErr} from "../../error/errUtil.js";
export default asyncWrapper( async (req, res, next) => {
    const {user: {user_id},params:{id:job_id}} = req;
    const deletedJob = await Job.findOneAndDelete({_id:job_id,createdBy:user_id});
    if(!deletedJob) {
        throw handlenotFoundErr(`Job not found`);
    }
    res.status(StatusCodes.OK).json({
        status: `Job deleted successfully`,
    })
})
