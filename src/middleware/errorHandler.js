import customErr from '../error/customErr.js';
export default (err, req, res, next) => {
    if (err instanceof customErr) {
      return  res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message
        });
    } 
       res.status(500).json({
            status: 500,
            message: 'Internal Server Error'
        });
}
