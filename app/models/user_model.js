const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
  'user',
  new mongoose.Schema(
    {
      fullName: { type: String, trim: true },
      userName: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
      mobile: { type: String, trim: true },
      gender : String,
      collegeName : String,
      degree : String,
      location : String,
      password : String,
      skills : String,
      role: { type: mongoose.Schema.Types.ObjectId, ref: 'role' },
      status: { type: String, enum: ['active', 'inactive'], default: 'active' },
      isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false }
  ),
  'users'
);
