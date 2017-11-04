const Joi = require('joi');

const config = require('../../../config/server');
const CONSTANTS = require('../../../constants');

const joiObject = Joi.object().options(config.validation_options); // TODO: separate joi validation to utils

Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId().required();

const login = joiObject.keys({
    email   : Joi.string().email().required(),
    password: Joi.string().required().min(CONSTANTS.PASSWORD_MIN_LENGTH)
});

const create = joiObject.keys({
    email: Joi.string().email().required(),
    name : Joi.string().required(),
    role : Joi.string()
});

const update = joiObject.keys({
    email    : Joi.string().email(),
    name     : Joi.string(),
    role     : Joi.string(),
    updatedAt: Joi.date().default(Date.now, 'time of updating')
});

const getAll = joiObject.keys({
    sort : Joi.string(),
    order: Joi.string().valid([CONSTANTS.GET_ORDERS.ASCENDING, CONSTANTS.GET_ORDERS.DESCENDING]).default(CONSTANTS.DEFAULT_ORDER),
    skip : Joi.number().integer().min(0).default(CONSTANTS.DEFAULT_SKIP),
    limit: Joi.number().integer().min(1).default(CONSTANTS.DEFAULT_LIMIT)
});

module.exports = {
    id,
    login,
    create,
    update,
    getAll
};