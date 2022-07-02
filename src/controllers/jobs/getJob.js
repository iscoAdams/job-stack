import StatusCodes  from "http-status-codes";
import asyncWrapper from "../../middleware/asyncWrapper.js";
import {handlenotFoundErr} from "../../error/errUtil.js";
import Job from "../../models/Job.js";
export default asyncWrapper( async (req, res, next) => {
    const {user: {user_id},params:{id:job_id}} = req; // the user object from the auth middleware 
    // const job = await Job.findOne({_id}).populate('createdBy');
    const job = await Job.findOne({_id:job_id,createdBy:user_id});
    if(!job) {
      throw handlenotFoundErr(`Job not found`);
    }
    const {position,company,status} = job;
    res.status(StatusCodes.OK).json(
        {
            position,
            company,
            status,
        })
})
