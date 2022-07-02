import StatusCodes  from "http-status-codes";
import asyncWrapper from "../../middleware/asyncWrapper.js";
import Job from "../../models/Job.js";
import {handlenotFoundErr,handleBadRequestErr} from "../../error/errUtil.js";
export default asyncWrapper( async (req, res, next) => {
    const {
        user: {user_id},
        params:{id:job_id},
        body: {company,position,status} //i destructured the body object to get the company and position to check if they exist in the request body
        } = req; // the user object from the auth middleware
        if (!company || !position|| !status) {
            throw handleBadRequestErr(`someting is missing check again`);
        }
    const updatedJob = await Job.findByIdAndUpdate({_id:job_id,createdBy:user_id}, req.body, {new:true,runValidators:true});
    if(!updatedJob) {
        throw handlenotFoundErr(`Job not found`);
    }
    res.status(StatusCodes.OK).json({
        status : `Job updated successfully`,
        updatedJob
    })
})
