const Joi = require('joi');

const categoriesValidation=(data)=>{
    const schema=Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
        numberOfRecipes: Joi.number().integer().min(0).required(),
        recipes: Joi.array().items(Joi.string()).required() 
    })
    return schema.validate(data);
}

module.exports = categoriesValidation;