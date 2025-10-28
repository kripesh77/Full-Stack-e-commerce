const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please tell us your name"] },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      //runs only on "create" or "save"
      validator: function (val) {
        return val === this.password;
      },
    },
  },
  role: { type: String, enum: ["user", "seller", "admin"], default: "user" },
  passwordChangedAt: Date,
  active: { type: Boolean, default: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    //if jwt is issued after password is changed, return true
    return JWTTimestamp < changedTimestamp;
  }

  //False means password is not changed yet
  return false;
};

userSchema.methods.correctPassword = async (plainPassword, hashPassword) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
