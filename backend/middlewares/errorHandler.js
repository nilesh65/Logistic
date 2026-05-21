//handle 404 not found
export const notFoundHandler = (req,res,next) =>{
    res.status(404).json({
        message: "Route not found"
})
}
//centralized error handling middleware

export const errorHandler = (err,req,res,next) => {
    console.error("Error", err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || "Internal Server Error"
    })
}