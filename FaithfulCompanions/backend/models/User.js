const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isActivated: { type: Boolean, default: false },
  token: { type: String }, // Add token field
  tokenExpires: { type: Date } // Add token expiry time field
}, { collection: 'UserDetail' });

userSchema.pre('save', async function (next) {
  // Hash password if it's been modified (or is new)
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  
  next();
});

const User = mongoose.model('UserDetail', userSchema);

module.exports = User;
