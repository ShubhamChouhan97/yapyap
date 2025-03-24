const User = require("../models/User");
const Message = require("../models/Messages"); // Assuming you have a Message model
const jwt = require("jsonwebtoken");
const format12HourTime = (date) => {
    if (!date) return "";
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  };
  
const getAllUsers = async (req, res) => {
    try { 
        // Extract token from cookies
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.email) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        // Find the user and populate the contacts array along with messages
        const user = await User.findOne({ email: decoded.email })
            .populate("contacts.contactpersonid", "userName email dp about livestatus")
            .populate("contacts.messages"); // Populate messages array with full objects

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Convert contacts into an array of objects with user details
        const connections = await Promise.all(user.contacts.map(async (contact) => {
            // Fetch all messages from the referenced Message model
            const messages = await Message.find({ _id: { $in: contact.messages } });
            // console.log("sss",messages);

            return {
                reciverobjectid: contact._id,
                _id: contact.contactpersonid._id,
                name: contact.contactpersonid.userName,
                dp: contact.contactpersonid.dp,
                about: contact.contactpersonid.about,
                unreadCount: contact.unreadCount,
                livestatus: contact.contactpersonid.livestatus, 
               // lastseen:format12HourTime(contact.lastseen),
                 // Store the retrieved message objects
                lastMessage: contact.lastMessage,
                chattime: format12HourTime(contact.lastChatTime),
            };
        }));

        // Send the connections array
        res.status(200).json(connections);
    } catch (error) {
        console.error("❌ Error in getAllUsers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const ofuser = async(req,res)=>{
        // Check if a token is provided in the Authorization header
            const {reciveratid,senderatid }= req.body;
           // console.log("reciverid",reciveratid);
           // console.log("senderid",senderatid);
            const givenuser = await User.findById(reciveratid);
           // console.log("givenuser:",givenuser);


            const userObject = givenuser.toObject(); 
            let contact = userObject.contacts.find(
                (c) => c.contactpersonid.toString() === senderatid
               );

              //console.log("contact store",contact.messages);
            delete userObject.password;
            delete userObject.contacts;
            delete userObject.email;
            delete userObject.__v;
         delete userObject.createdAt; 
             delete userObject.updatedAt;
             userObject.chat = contact ? contact.messages : [];
             userObject.lastseen = contact ? format12HourTime(contact.lastseen) : '';


         //console.log("givenuser:", userObject);

            res.status(200).json(userObject);
     
};
const messag  = async(req,res)=>{
    // Check if a token is provided in the Authorization header
    try {
        const { messageIds } = req.body;
        const messages = await Message.find({ _id: { $in: messageIds } });
        res.json(messages);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
      }
 
};

module.exports = { getAllUsers,ofuser,messag };
