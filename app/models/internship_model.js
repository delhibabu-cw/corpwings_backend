const { mongoose } = require('../services/imports')

module.exports = mongoose.model(
    'internship',
    new mongoose.Schema(
        {
            banner : {
                name : { type: String, trim: true },
                img_url : String,
                description : String,
            },
            internshipData :[
                {
                    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
                    name : { type: String, trim: true },
                    img_url : String,
                    description : String,
                }
            ],
            isDeleted: { type: Boolean, default: false },
        },
        { timestamps: true, versionKey: false }
    ),
    'internships'
);