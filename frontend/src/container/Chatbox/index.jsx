
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import Chatcontainer from '../../component/Chatcontainer';

import { io } from "socket.io-client";
const socket = io("https://wback-06q5.onrender.com");
function Chatbox({ reciverId,selectedChat}) {
 
  return (
    <div className={styles.chatboxmaindiv}>
      <Chatcontainer reciverId={reciverId} selectedChat={selectedChat}/>
    </div>
  );
}

export default Chatbox;

// import React, { useEffect, useState } from 'react';
// import styles from './style.module.css';
// import Chatcontainer from '../../component/Chatcontainer';
// import { Chatofuser } from '../../API/chatofuser';
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// function Chatbox({ reciverId, selectedChat }) {
//   const userId = localStorage.getItem("userId");
//   const [details, setDetails] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchChat = async () => {
//     setLoading(true);
//     try {
//       const response = await Chatofuser(userId, reciverId);
//       setDetails(response);
//     } catch (error) {
//       console.error("Error fetching chat:", error);
//       setDetails([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!selectedChat || !userId) return;
//     fetchChat();
//   }, [reciverId, userId]);

//   useEffect(() => {
//     const handleLiveStatus = () => {
//       fetchChat();
//     };

//     socket.on("livestatus", handleLiveStatus);

//     return () => {
//       socket.off("livestatus", handleLiveStatus);
//     };
//   }, []);

//   return (
//     <div className={styles.chatboxmaindiv}>
//       {loading ? <p>Loading...</p> : <Chatcontainer reciverId={reciverId} selectedChat={selectedChat} details={details} />}
//     </div>
//   );
// }

// export default Chatbox;
