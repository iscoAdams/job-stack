import { Router } from "express";
import getallJobs from "../controllers/jobs/getallJobs.js";
import getJob from "../controllers/jobs/getJob.js";
import createJob from "../controllers/jobs/createJob.js";
import updateJob from "../controllers/jobs/updateJob.js";
import deleteJob from "../controllers/jobs/deleteJob.js";
import auth from "../middleware/auth.js";

const router = Router();
router.route("/").get(getallJobs).post(auth,createJob);
router.route("/:id").get(getJob).patch(auth,updateJob).delete(auth,deleteJob);
export default router;
