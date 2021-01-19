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
                firstName: Joi.string()
                    .min(5)
                    .max(20)
                    .required(),
                age: Joi.number()
                    .min(1)
                    .max(3)

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
