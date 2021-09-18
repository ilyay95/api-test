const { Joi } = require('express-validation');

const validations = {

    delete: {
        params: Joi.object({
            id: Joi.number()
                .integer()
                .positive()
                .required()
        })
    },
    post: {
        body: Joi.object({
            user: Joi.object({
                userId: Joi.number()
                    .min(1)
                    .max(100)
                    .required()
                    .positive(),
                groupId: Joi.number()
                    .min(0)
                    .max(100)
                    .required()
                    .positive()
            })
        })
    },
}

module.exports = validations;
