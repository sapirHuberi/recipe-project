const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user.route');
const recipeRoute = require('./routes/recipe.route');
const categoryRoute= require('./routes/category.route')
const errorMiddleware = require('./middlewares/error.middleware');
// 1. טעינת משתני הסביבה (חייב להיות לפני השימוש ב-process.env)
dotenv.config();    
const app = express();
app.use(express.json());

// 2. הגדרת הראוטים
app.use('/api/users', userRoute);
app.use('/api/recipes', recipeRoute);
app.use('/api/categories',categoryRoute);

// בתוך app.js, לפני ה-app.use של הראוטים:
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

app.use(errorMiddleware);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas successfully'))
    .catch((err) => {
        console.log("--- שגיאה בחיבור ---");
        console.error(err.message);
    });

const PORT = process.env.PORT || 3000;   
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});