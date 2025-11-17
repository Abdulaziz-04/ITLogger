const Joi = require('joi');
const mongoose = require('mongoose');

const techSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);
const Tech = mongoose.model('technicians', techSchema);

const validateTech = tech => {
    const schema = Joi.object({
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required()
    });
    return schema.validate(tech);
};

module.exports.Tech = Tech;
module.exports.validateTech = validateTech;

const logSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
            trim: true
        },
        attention: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            enum: ['open', 'in_progress', 'resolved'],
            default: 'open'
        },
        category: {
            type: String,
            trim: true,
            default: 'General'
        },
        dt: {
            type: Date,
            default: Date.now
        },
        tech: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);
const Logs = mongoose.model('logs', logSchema);

module.exports.Logs = Logs;
