const Joi = require('joi');

const userValidator = {
    register: (data) => {
        const schema = Joi.object({
            username: Joi.string().min(2).required(),
            email: Joi.string().email().required(),
            // סיסמה חזקה: לפחות 8 תווים, אות גדולה, אות קטנה ומספר
            password: Joi.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).required(),
            address: Joi.string().required(),
            role: Joi.string().valid('admin', 'user')
        });
        return schema.validate(data);
    },
    login: (data) => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        return schema.validate(data);
    }
};

module.exports = userValidator;