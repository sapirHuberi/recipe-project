const Recipe = require('../models/Recipe');
const recipeValidation = require('../validation/recipe.validator');

// יצירת מתכון חדש
exports.addRecipe = async (req, res, next) => {
    try {
        const { error } = recipeValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const newRecipe = new Recipe({
            ...req.body,
            addedBy: req.user._id // הגיע מהמידלוור!
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        next(err);
    }
};

exports.getAllRecipes = async (req, res, next) => {
    try {
        // 1. חילוץ פרמטרים מה-Query String (עם ערכי ברירת מחדל)
        let { search, page = 1, limit = 5 } = req.query;
        const userId = req.user?._id; // המזהה של המשתמש מהטוקן (דרך המידלוור)

        // 2. בניית הפילטר של החיפוש הטקסטואלי (RegExp)
        let query = {};
        if (search) {
            // חיפוש חופשי בשם המתכון או בתיאור, לא רגיש לאותיות גדולות/קטנות
            query.$or = [
                { name: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') }
            ];
        }

        // 3. לוגיקת פרטיות: הצגת ציבוריים + הפרטיים שלי בלבד
        // אם המשתמש לא מחובר, יראה רק ציבורי. אם מחובר, יראה ציבורי או כאלו שהוא יצר.
        if (userId) {
            query.$or = (query.$or || []).concat([
                { isPrivate: false },
                { addedBy: userId }
            ]);
        } else {
            query.isPrivate = false;
        }

        // 4. ביצוע השילוב: חיפוש + דפדוף + פופולייט
        const recipes = await Recipe.find(query)
            .skip((page - 1) * limit) // דילוג על דפים קודמים
            .limit(Number(limit))     // הגבלת כמות תוצאות
            .populate('addedBy', 'username email')
            .sort({ addDate: -1 });   // מיון מהחדש לישן

        // 5. שליחת כמות התוצאות הכוללת (שימושי לצד הלקוח לבניית כפתורי הדפים)
        const total = await Recipe.countDocuments(query);

        res.status(200).json({
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            data: recipes
        });
    } catch (err) {
        next(err);
    }
};

//שליפת מתכון לפי קוד מתכון
exports.getRecipeById = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate('addedBy', 'username email')
            .populate('category');
        
        if (!recipe) return res.status(404).json({ message: "המתכון לא נמצא" });
        res.status(200).json(recipe);
    } catch (err) {
        next(err);
    }
};

// עדכון מתכון
exports.updateRecipe = async (req, res,next) => {
    try {
        // ולידציה (אופציונלי להשתמש ב-partial validation אם לא כל השדות נשלחים)
        const { error } = recipeValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedRecipe) return res.status(404).json({ message: "המתכון לא נמצא לעדכון" });
        res.status(200).json(updatedRecipe);
    } catch (err) {
        next(err);
    }
};

// מחיקת מתכון
exports.deleteRecipe = async (req, res, next) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) return res.status(404).json({ message: "המתכון לא נמצא למחיקה" });
        res.status(200).json({ message: "המתכון נמחק בהצלחה" });
    } catch (err) {
        next(err);
    }
};

// שליפת מתכונים לפי משתמש (למשל עבור "המתכונים שלי")
exports.getRecipesByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const recipes = await Recipe.find({ addedBy: userId });
        res.status(200).json(recipes);
    } catch (err) {
       next(err);
    }
};

// שליפת מתכונים לפי זמן הכנה מקסימלי
exports.getRecipesByTime = async (req, res,next) => {
    try {
        const { minutes } = req.params; // נקבל את המספר מהכתובת
        
        const recipes = await Recipe.find({ 
            preparationTime: { $lte: Number(minutes) }, // פילטר: זמן קטן או שווה ל...
            isPrivate: false // נרצה להציג רק מתכונים ציבוריים
        }).populate('addedBy', 'username');

        res.status(200).json(recipes);
    } catch (err) {
        next(err);
    }
};