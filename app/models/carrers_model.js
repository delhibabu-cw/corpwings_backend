const { mongoose } = require('../services/imports')

module.exports = mongoose.model(
    'carrer',
    new mongoose.Schema(
        {
            name : { type: String, trim: true },
            img_url : String,
            description : String,
            experience : String,
            location : String,
            responsibilities : [String],
            skills : [String],
            qualifications : [String],
            status: { type: String, enum: ['active', 'inactive'], default: 'active' },
            isDeleted: { type: Boolean, default: false },
        },
        { timestamps: true, versionKey: false }
    ),
    'carrers'
);