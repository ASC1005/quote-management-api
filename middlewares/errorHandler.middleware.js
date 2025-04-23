import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    let statusCode = 500;
    
    if (err instanceof ApiError) {
        statusCode = err.statusCode;
    }

    res.status(statusCode).json({
        error: {
            message: err.message || "Internal Server Error"
        }
    });
};

export default errorHandler;