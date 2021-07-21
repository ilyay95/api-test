const { Joi } = require('express-validation');

const validations = {
    select: {
        query: Joi.object({
            firstName: Joi.string()
                .trim()
                .min(3)
                .max(50)

        })
    },
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
                    .min(3)
                    .max(50)
                    .required(),
                age: Joi.number()
                    .min(1)
                    .max(100)
                    .required()
                    .positive(),
                professionId: Joi.number()
                    .min(0)
                    .max(5)
                    .required()
                    .positive(),
                logo: Joi.string()
                    .trim()
                    .min(3)
                    .max(1000000)
                    .required()
            })
        })
    },
    put: {
        params: Joi.object({
            id: Joi.number()
                .integer()
                .positive()
                .required()
        }),
        body: Joi.object({
            user: Joi.object({
                firstName: Joi.string()
                    .trim()
                    .min(3)
                    .max(50)
                    .required(),
                age: Joi.number()
                    .min(1)
                    .max(100)
                    .required()
                    .positive(),
                professionId: Joi.number()
                    .min(1)
                    .max(5)
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
