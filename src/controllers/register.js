import User from "../models/User.js";
import StatusCode from 'http-status-codes';
import asyncWrapper from '../middleware/asyncWrapper.js'
export default  asyncWrapper (async (req, res, next ) => {
        const user = await User.create({...req.body}); // i did the encryption in the model
        const { _id,  name} = user; //as i want to sign both the id and the name for later
       
        res.status(StatusCode.CREATED).json({ 
            user: { _id, name },
            token: `${user.createAuthToken()}`,
         });
})