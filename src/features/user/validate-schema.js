const Joi = require('joi');

const config = require('../../../config/server');
const CONSTANTS = require('../../../constants');

const joiObject = Joi.object().options(config.validation_options); // TODO: separate joi validation to utils

Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId().required();

const create = joiObject.keys({
    email: Joi.string().email().required(),
    name : Joi.string().required()
});

const update = joiObject.keys({
    email: Joi.string().email(),
    name : Joi.string()
});

const getAll = joiObject.keys({
    sort : Joi.string(),
    order: Joi.number().valid([CONSTANTS.GET_ORDERS.ASCENDING, CONSTANTS.GET_ORDERS.DESCENDING]).default(CONSTANTS.DEFAULT_ORDER),
    skip : Joi.number().integer().min(0).default(CONSTANTS.DEFAULT_SKIP),
    limit: Joi.number().integer().min(1).default(CONSTANTS.DEFAULT_LIMIT)
});

module.exports = {
    id,
    create,
    update,
    getAll
};