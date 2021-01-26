const { Joi } = require('express-validation');

const validations = {
    get: {
        params: Joi.object({
            id: Joi.number()
                .integer()
                .positive()
        }),
    },
    post: {
        body: Joi.object({
            user: Joi.object({
                id: Joi.number()
                    .integer()
                    .positive(),
                firstName: Joi.string()
                    .trim()
                    .min(3)
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
