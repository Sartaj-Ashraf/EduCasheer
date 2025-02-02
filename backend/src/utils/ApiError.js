class ApiError extends Error {
    constructor(statusCode = 500, message = "Something went wrong", errors = []) {
        // Call parent constructor
        super(message);

        // Set custom properties
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;

        // Maintain proper stack trace
        Error.captureStackTrace(this, this.constructor);

        // Set error name for better debugging
        this.name = this.constructor.name;
    }

    // Add method to get error response object
    toJSON() {
        return {
            success: this.success,
            message: this.message,
            statusCode: this.statusCode,
            data: this.data,
            errors: this.errors,
            ...(process.env.NODE_ENV === 'development' && { stack: this.stack })
        };
    }
}

export { ApiError };