const Joi = require('joi');

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });

    return schema.validate(data);
}

module.exports.loginValidation = loginValidation;