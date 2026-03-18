const Joi=require('joi');

const userValidation=(data)=>{
    const schema=Joi.object({
        username:Joi.string().min(2).max(30).required(),
        password: Joi.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required()
            .messages({ 'string.pattern.base': 'הסיסמה חייבת לכלול אות גדולה, קטנה ומספר' }),
        email: Joi.string().email().required(),
        address: Joi.string().required(),
        role: Joi.string().valid('admin', 'user').default('user')    
    })
    return schema.validate(data);
};

const recipeValidation=(data)=>{
    const schema=Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.array().items(Joi.string()).min(1).required(),
        preparationTime: Joi.number().min(1).required(),
        difficulty: Joi.number().integer().min(1).max(5).required(),
        addDate: Joi.date().default(Date.now),
        layers: Joi.array().items(
           Joi.object({
                description: Joi.string().required(),
                ingredients: Joi.array().items(Joi.string()).min(1).required()
            })
        ).min(1).required(),   
        instructions: Joi.array().items(Joi.string()).min(1).required(),
        image: Joi.string().required(),
        isPrivate: Joi.boolean().default(false),
        addedBy: Joi.string().required()
       
    })
    return schema.validate(data);
}

const categoriesValidation=(data)=>{
    const schema=Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
        numberOfRecipes: Joi.number().integer().min(0).required(),
        recipes: Joi.array().items(Joi.string()).required() 
    })
    return schema.validate(data);
}
module.exports = { userValidation, recipeValidation, categoriesValidation };