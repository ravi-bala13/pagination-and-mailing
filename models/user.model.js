const mongoose = require("mongoose")


const userSchema = new mongoose.Schema(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: false },
      email: { type: String, required: true, unique: true},
      role: { type: String, required: true}
    },
    {
      versionKey: false,
      timestamps: true,
    }
);



module.exports = mongoose.model("user", userSchema);