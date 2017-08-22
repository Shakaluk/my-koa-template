const Joi = require('joi');

const config = require('../../../config/server');

const joiObject = Joi.object().options(config.validation_options);

const create = joiObject.keys({
    email: Joi.string().email().required(),
    name : Joi.string().required()
});

const update = joiObject.keys({
    email: Joi.string().email(),
    name : Joi.string()
});

module.exports = {
    update,
    create
};