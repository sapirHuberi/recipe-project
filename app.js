const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoute = require('./routes/user.route');
dotenv.config();    
const app = express();
app.use(express.json());
app.use('/api/users', userRoute);

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('Connected to MongoDB Atlas successfully'))
//     .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// const PORT = process.env.PORT || 3000;   
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
    
// בתוך app.js
const uri = "mongodb+srv://SapirHuberi:JwjbR5F5QMm3cWX3@cluster0.mnmxdlr.mongodb.net/recipeDB?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB Atlas successfully'))
    .catch((err) => {
        console.log("--- שגיאה בניסיון ישיר ---");
        console.error(err.message);
    });