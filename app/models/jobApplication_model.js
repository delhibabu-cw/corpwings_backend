const { mongoose } = require('../services/imports')

module.exports = mongoose.model(
    'jobApplication',
    new mongoose.Schema(
    {
        fullName : { type: String, trim: true },
        email: { type: String, trim: true, lowercase: true },
        mobile: { type: String, trim: true },
        yearOfGraduation: String,
        gender : String,
        experience : String,
        expectedCTC : String,
        noticePeriod : String,
        skillSet : [String],
        vacany : String,
        currentLocation : String,
        resume : String,
        career : { type: mongoose.Schema.Types.ObjectId, ref: 'carrer' },
        status: { type: String, enum: ['active', 'inactive'], default: 'active' },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false }
),
'jobApplications'
)