const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverobjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    imageUrl:{
      type:String,
    },
    time: {
      type: String, // Store the formatted time
      default: function () {
        return new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      },
    },
  },
  { timestamps: true }
);

// Method to get formatted time if needed
messageSchema.methods.getFormattedTime = function () {
  return this.time;
};

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
module.exports = Message;
