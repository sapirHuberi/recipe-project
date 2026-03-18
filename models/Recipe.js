const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "חובה להזין שם מתכון"],    
    },
    description: {
        type: String,
        required: [true, "חובה להזין תיאור מתכון"]
    },
    // שימוש ב Reference
    category: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    preparationTime: {
        type: Number,
        required: [true, "חובה להזין זמן הכנה בדקות"],
        min: [1, "זמן ההכנה חייב להיות לפחות דקה אחת"]
    },
    difficulty: {   
        type: Number,
        required: [true, "חובה להזין דרגת קושי"],
        min: [1, "דרגת הקושי חייבת להיות בין 1 ל-5"],
        max: [5, "דרגת הקושי חייבת להיות בין 1 ל-5"]
    },
    addDate: {
        type: Date,
        default: Date.now  
    },
    // שימוש ב Embedded 
    layers: [{
        description: {
            type: String,  
            required: [true, "חובה להזין תיאור שכבה"]
        },
        ingredients: {
            type: [String], 
            validate: {
                validator: function(v) {
                    return v && v.length > 0; 
                },
                message: "חובה להזין לפחות מרכיב אחד בשכבה"
            }
        }
    }],
    instructions: {
        type: [String],
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: "חובה להזין לפחות שלב אחד בהוראות ההכנה"
        }
    },
    image: {
        type: String,
        required: [true, "חובה להזין קישור לתמונה של המתכון"]
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
       // שימוש ב Reference
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "חובה להזין את המשתמש שהוסיף את המתכון"]
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);