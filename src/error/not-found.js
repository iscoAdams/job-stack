import customErr from "./customErr.js";
import StatusCodes  from "http-status-codes";
export default  class notFoundErr extends customErr {
    constructor(message) {
      super(message);
      this.statusCode =  StatusCodes.NOT_FOUND;
    }
  }
export const handlenotFoundErr = (message) => {
      return new notFoundErr(message);
  } 