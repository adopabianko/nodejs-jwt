const Joi = require('joi');

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;