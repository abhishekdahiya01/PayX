const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        status: err.status || "error",
        message:
            statusCode >= 500
                ? "Internal server error"
                : err.message,
        ...(process.env.NODE_ENV === "development" && {
            stack: err.stack
        })
    });
};

export default errorMiddleware;