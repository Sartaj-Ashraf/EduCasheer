class ApiResponse {
    constructor(statusCode, message="Success", data, success) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = success < 400
    }
}