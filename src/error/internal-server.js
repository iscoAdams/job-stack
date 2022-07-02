import  StatusCodes  from "http-status-codes";
import  customErr  from "./customErr.js";
export default class internalServerErr extends customErr {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
}
export const handleInternalServerErr = (message) => {
    return new internalServerErr(message);
}