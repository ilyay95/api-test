const { Joi } = require('express-validation');

const validations = {
    query: {
        query: Joi.object({
            currentPage: Joi.number()
                .min(1)
                .max(100)
                .positive(),
            pageSize: Joi.number()
                .min(1)
                .max(100)
                .positive(),
            search: Joi.string()
                .trim()
                .min(1)
                .max(50)
        })
    },
    select: {
        query: Joi.object({
            name: Joi.string()
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

            name: Joi.string()
                .trim()
                .min(3)
                .max(50)
                .required(),

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
}

module.exports = validations;
