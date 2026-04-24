const Joi=require('joi');

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


module.exports =  recipeValidation;