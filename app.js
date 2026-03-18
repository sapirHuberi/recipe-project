const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoute = require('./routes/userRoute');
dotenv.config();    
const app = express();
app.use(express.json());
app.use('/api/users', userRoute);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas successfully'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

const PORT = process.env.PORT || 3000;   
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    