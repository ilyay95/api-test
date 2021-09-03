const { Joi } = require('express-validation');

const validations = {

    get: {
        params: Joi.object({
            id: Joi.number()
                .integer()
                .positive()
                .required()
        }),
    }
}

module.exports = validations;
