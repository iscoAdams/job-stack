import customErr from "./customErr.js";
import  StatusCodes  from "http-status-codes";
export default class unauthorizedErr extends customErr {
    constructor(message) {
      super(message);
      this.statusCode =  StatusCodes.UNAUTHORIZED;
    }
  }
export const handleUnauthorizedErr = (message) => {
      return new unauthorizedErr(message);
  } 