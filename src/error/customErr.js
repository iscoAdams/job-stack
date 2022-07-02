export default class customErr extends Error {
  constructor(message,statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}
// export const handleErr = (message, statusCode) => {
//     return new customErr(message, statusCode);
// } 
