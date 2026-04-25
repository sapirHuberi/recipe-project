// middlewares/error.middleware.js

const errorMiddleware = (err, req, res, next) => {
    console.error("--- Error Caught by Middleware ---");
    console.error(err.stack); // מדפיס את נתיב השגיאה בטרמינל לדיבג

    const statusCode = err.statusCode || 500;
    const message = err.message || "שגיאת שרת פנימית";

    res.status(statusCode).json({
        status: "error",
        message: message,
        // אפשר להוסיף stack רק אם אנחנו בסביבת פיתוח
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
};

module.exports = errorMiddleware;