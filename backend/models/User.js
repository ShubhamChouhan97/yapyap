const mongoose = require("mongoose");

const format12HourTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
};

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    accountstatus:{
      type:String,
      required:true,
      default:null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dp: {
      type: String,
      default:"/uploads/profile/1741693932747.png",
    },
    about: {
      type: String,
      default: "Hey there! I am using YapYup",
    },
    livestatus:{
      type:String,
      default:null,
    },
    contacts: [
      {
        contactpersonid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        messages: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
          },
        ],
        unreadCount: { type: Number, min: 0, default: 0 },
        lastChatTime: {
          type: Date, // Keep this as Date (MongoDB can handle it)
          default: Date.now,
        },
        lastMessage: {
          type: String,
          default: "Start Chat",
        },
        lastseen:{
          type: Date, // Keep this as Date (MongoDB can handle it)
          default: null,
        },
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

// Middleware to update lastMessage before saving
// userSchema.pre("save", async function (next) {
//   for (let contact of this.contacts) {
//     if (contact.messages.length > 0) {
//       const lastMsg = await mongoose.model("Message").findById(contact.messages[contact.messages.length - 1]);
//       contact.lastMessage = lastMsg ? lastMsg.text : "Start Chat";
//     } else {
//       contact.lastMessage = "Start Chat";
//     }
//   }
//   next();
// });
userSchema.pre("save", async function (next) {
  for (let contact of this.contacts) {
    if (contact.messages.length > 0) {
      const lastMsg = await mongoose.model("Message").findById(contact.messages[contact.messages.length - 1]);
      if (lastMsg) {
        // If the last message contains an image, set 'Image Shared'
        contact.lastMessage = lastMsg.imageUrl ? "Image Shared" : lastMsg.text;
      } else {
        contact.lastMessage = "Start Chat";
      }
    } else {
      contact.lastMessage = "Start Chat";
    }
  }
  next();
});


const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;

