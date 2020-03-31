const joi = require('joi');
const db = require('mongoose');

const techSchema = new db.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});
const Tech = db.model('technicians', techSchema);

const validateTech = tech => {
    const schema = {
        firstName: joi.string().required(),
        lastName: joi.string().required()
    };
    return joi.validate(tech, schema);
};

module.exports.Tech = Tech;
module.exports.validateTech = validateTech;

const logSchema = new db.Schema({
    message: {
        type: String,
        required: true
    },
    attention: {
        type: Boolean,
        default: false
    },
    dt: {
        type: Date,
        default: Date.now()
    },
    tech: {
        type: String
    }
});
const Logs = db.model('logs', logSchema);

module.exports.Logs = Logs;
