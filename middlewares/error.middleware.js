const errorMiddleware = (err, req, res, next) => {
    try {
        let error =  { ...err };

        error.message = err.message;

        console.error(err);

        // Mongoose bad ObjectId
        if(err.name === 'CasterError') {
            const message = 'Resource not found';
            error = new Error('message');
            error.statusCode = 404;
        }

        // Mongoose duplicate key
        if (err.code === 11000) {
            const message = 'Resource already exists';
            error = new Error('message');
            error.statusCode = 400; // Bad request
        }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(','));
            err.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({success: false, message: error.message || 'Server error'});
    }catch(error) {
        next(error);
    }
};

export default errorMiddleware;