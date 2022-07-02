import express  from "express";
import dotenv from "dotenv";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import connect from "./config/connect.js";
import jobRoutes from "./routs/jobRoutes.js";
import registerRoute from "./routs/registerRoute.js";
import loginRoute from "./routs/loginRoute.js";
import auth from "./middleware/auth.js";
import cors from 'cors';
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
// import 'express-async-errors'
const app = express();
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
    }));
app.use(express.json());
app.set('trust proxy', 1)

dotenv.config();
app.get('/', (req, res) => {
  res.send("<h1 style = color:BurlyWood;font-family:verdana;text-align:center>welcome abroad🚀</h1>");
})
app.use('/api/v1/jobs',auth,jobRoutes);
app.use('/api/v1',registerRoute);
app.use('/api/v1',loginRoute);


 

app.use(notFound);
app.use(errorHandler);
const run = async () => {
try {
    const port = process.env.PORT || 8000;
    await connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`yooo isco Server is runnin on port ${port}`);
        })
    } 
catch (error) {
    console.log(error);
    }
}
run();