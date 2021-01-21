const { Joi } = require('express-validation');

const validations = {
    get: {
        params: Joi.object({
            id: Joi.number()
                .integer()
                .positive()
                .required()
        }),
    },
    post: {
        body: Joi.object({
            user: Joi.object({
                firstName: Joi.string()
                    .trim()
                    .min(5)
                    .max(50)
                    .required(),
                age: Joi.number()
                    .min(1)
                    .max(100)
                    .required()
                    .positive()

            })
        })
    },
    delete: {
        params: Joi.object({
            id: Joi.number()
                .integer()
                .positive()
                .required()
        })
    }
};

module.exports = validations;
