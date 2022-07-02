import { StatusCodes } from "http-status-codes";
export default  (fn)=>{
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            // console.log(error);
            // next(handleBadRequestErr(error.message));
            if (error.name === "ValidationError") { 
            //here is the parsing for the json object of errors i'm fetching from mongoose
                let errors = {};
                Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                });
                return res.status(StatusCodes.UNAUTHORIZED).send(errors);
              }
            if (error.name === "MongoServerError") { //for duplication
                if (error.code === 11000) {
                  return res.status(StatusCodes.CONFLICT).send({
                    message: "Email already exists",
                  });
                }
              }
              if (error.name === "CastError") {
                return res.status(StatusCodes.NOT_FOUND).send({
                  message: `no item found with the id ${error.value}`,
                });
              }
              // console.log(error);
              next(error); //pass to errorHandler middleware
    }
  }
}