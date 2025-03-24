const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 3000;
const Message = require("./models/Messages");
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const chatRoutes = require('./routes/chatRoutes');

process.env.TZ = 'Asia/Kolkata';

const DB = require('./config/db');
const User = require("./models/User");

DB();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  // console.log(`response: ${res.statusCode}`);
  next();
});

app.use("/uploads", express.static("uploads")); // Serve uploaded images
dotenv.config();
app.use(bodyParser.json({ limit: "50mb" })); 
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));


app.use(cors({
  origin: '*', // Allow all origins (not recommended for production)
  credentials: true, // Allow cookies and authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));
  
// Routes

app.use('/upload',uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes); 

app.get('/', (req, res) => {
    res.send('server start');
});
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow frontend
    credentials: true
  }
});

// Store online users
const onlineUsers = {};

io.on("connection", (socket) => {
  //console.log(`User connected: ${socket.id}`);

  socket.on("online", async ({ id }) => {
    //console.log("User online ID:", id);
    try {
      const user = await User.findById(id);
      if (user) {
        user.livestatus = "Online";
        await user.save();
        
        io.emit("livestatus", { userId: id, livestatus: "Online" });
        io.emit("chat_updated");
      }
    } catch (error) {
      console.error("Error updating online status:", error);
    }
  });

  socket.on("offline", async ({ MyId }) => {
   // console.log("User offline ID:", MyId);
    try {
      const user = await User.findById(MyId);
      if (user) {
        user.livestatus = "Offline";
        await user.save();
        io.emit("livestatus", { userId: MyId, livestatus: "Offline" });
        io.emit("chat_updated");
      }
    } catch (error) {
      console.error("Error updating offline status:", error);
    }
  });

  socket.on("join", async ({ userId }) => {
    //console.log(`User joined: ${userId}`);
    onlineUsers[userId] = socket.id;

    try {
      const user = await User.findById(userId);
      if (user) {
        user.contacts.forEach((contact) => {
          if (onlineUsers[contact.contactpersonid]) {
            contact.unreadCount = 0;
          }
        });
        await user.save();
        io.emit("chat_updated");
      }
    } catch (error) {
      console.error("Error updating unread messages:", error);
    }
  });

  socket.on("privateMessage", async ({ reciverId, senderId, receiverobjectId, message, imageUrl }) => {
 //console.log("img url at server",imageUrl);

    try {
      // Create a new message with imageUrl if provided
      const newMessage = new Message({ 
        senderId, 
        receiverobjectId, 
        text: message || null, 
        imageUrl: imageUrl || null 
      });
      await newMessage.save();
  
      const senderUser = await User.findById(senderId);
      const reciverUser = await User.findById(reciverId);
  
      if (!senderUser || !reciverUser) {
        return socket.emit("error", { message: "User not found" });
      }
  
      let senderContact = senderUser.contacts.find((c) => c._id.toString() === receiverobjectId);
      let receiverContact = reciverUser.contacts.find((c) => c.contactpersonid.toString() === senderId);
  
      if (senderContact) senderContact.messages.push(newMessage._id);
      if (receiverContact) receiverContact.messages.push(newMessage._id);
  
      await senderUser.save();
      await reciverUser.save();
      io.emit("chat_updated");
  
      const receiverSocketId = onlineUsers[reciverId];
  
      if (receiverSocketId) {
        // Update unread count and last chat time
        if (receiverContact) {
          receiverContact.unreadCount = 0;
          senderContact.lastChatTime = new Date();
          // receiverContact.lastseen=new Date();
          receiverContact.lastChatTime = new Date();
        }
        if (senderContact)
          {  receiverContact.lastseen=new Date();
            // senderContact.lastChatTime = new Date();
          } 
   
          await senderUser.save();
          await reciverUser.save();

        io.to(receiverSocketId).emit("privateMessage", {
          senderIdbyserver: senderId,
          message,
          imageUrl,
          time: new Date().toISOString(),
        });
        io.emit("chat_updated");
       
      } else {
        // If receiver is offline, increment unread count
        if (receiverContact) receiverContact.unreadCount++;
  
        await senderUser.save();
        await reciverUser.save();
        io.emit("chat_updated");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
  



  socket.on("disconnect", () => {
    //console.log(`User disconnected: ${socket.id}`);
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        break;
      }
    }
  });
}); 


server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
