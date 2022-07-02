import StatusCodes  from "http-status-codes";
import asyncWrapper from "../../middleware/asyncWrapper.js";
import Job from "../../models/Job.js";
export default asyncWrapper( async (req, res, next) => {
        // const jobs = await Job.find({}).populate('createdBy').sort({createdAt: -1}); //all jobs associated to all users
        const jobs = await Job.find({createdBy: req.user.user_id}).sort({createdAt: -1}); //all jobs associated to current user iwth auth token
        res.status(StatusCodes.OK).json({
                amount: jobs.length,
                 jobs: jobs.map(job => {
                        return {
                                job_id: job._id,
                                position: job.position,
                                company: job.company,
                                status: job.status
                }})
        })
})
