const Joi = require('joi');

const CONSTANTS = require('../../../config/constants');

const joiObject = Joi.object().options(CONSTANTS.VALIDATION_OPTIONS);

const create = joiObject.keys({
    email: Joi.string().email().required(),
    name: Joi.string().required()
});

const update = joiObject.keys({
    email: Joi.string().email(),
    name: Joi.string()
});

module.exports = {
    update,
    create
};