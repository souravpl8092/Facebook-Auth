const mongoose = require("mongoose");

// The User document has fields for email, accountId, name, and provider.
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    accountId: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
    },
    provider: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
