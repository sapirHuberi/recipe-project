const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

// הוספנו next כפרמטר שלישי
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        next(err); 
    }
};

exports.getCategoriesWithRecipes = async (req, res, next) => {
    try {
        const categories = await Category.find().lean();
        
        const categoriesWithData = await Promise.all(categories.map(async (cat) => {
            const recipes = await Recipe.find({ category: cat._id, isPrivate: false })
                                        .select('name image preparationTime');
            return { ...cat, recipes };
        }));

        res.status(200).json(categoriesWithData);
    } catch (err) {
        next(err); // החלפנו את ה-res.status הידני ב-next
    }
};

exports.getCategoryDetails = async (req, res, next) => {
    try {
        const { idOrName } = req.params;
        
        const category = await Category.findOne({
            $or: [
                { _id: idOrName.length === 24 ? idOrName : null }, 
                { name: new RegExp(idOrName, 'i') }
            ]
        });

        if (!category) {
            // טיפ: אפשר ליצור שגיאה מותאמת אישית ולשלוח למידלוור
            const error = new Error("קטגוריה לא נמצאה");
            error.statusCode = 404;
            return next(error);
        }

        const recipes = await Recipe.find({ category: category._id, isPrivate: false });

        res.status(200).json({ category, recipes });
    } catch (err) {
        next(err);
    }
};