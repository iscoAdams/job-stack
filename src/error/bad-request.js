import customErr from "./customErr.js";
import StatusCodes from "http-status-codes";
export default class badRequestErr extends customErr {
    constructor(message) {
      super(message);
      this.statusCode =  StatusCodes.BAD_REQUEST;
    }
  }
export const handleBadRequestErr = (message) => {
      return new badRequestErr(message);
} 