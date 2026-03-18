const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "חובה להזין קוד קטגוריה"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "חובה להזין תיאור קטגוריה"]
    },
    numberOfRecipes: {
        type: Number,
        required: [true, "חובה להזין מספר מתכונים בקטגוריה"],  
        min: [0, "מספר המתכונים לא יכול להיות שלילי"]
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }]
})

module.exports = mongoose.model('Category', categorySchema);