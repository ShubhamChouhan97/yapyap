// import { Idget } from "../../API/idget";
// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import EmojiPicker from "emoji-picker-react";
// import styles from "./style.module.css";
// import Input from "../../component/Input";
// import Button from "../Button";
// import { Chatofuser } from '../../API/chatofuser';
// const socket = io("http://localhost:3000");

// function ChatContainer({ reciverId, selectedChat}) {
//   const [message, setMessage] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const lastMessageRef = useRef(null);
//   const [images, setImages] = useState([]);
//   const [imgforserver, setImgServer] = useState([]);
//   const fileInputRef = useRef(null);
// const [details, setDetails] = useState([]);

//  const userId = localStorage.getItem("userId");

//    useEffect(() => {
//       if (!selectedChat || !userId) return;
  
//       const fetchChat = async () => {
//         setLoading(true);
//         try {
//           const response = await Chatofuser(userId, reciverId);
//          console.log("response server",response);    
//           setDetails(response);
//         } catch (error) {
//           console.error("Error fetching chat:", error);
//           setDetails([]); // Reset chat in case of error
//         } 
//       };
//       fetchChat();
//     }, [reciverId, userId]);

//   useEffect(() => {
//     if (lastMessageRef.current) {
//       lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//     }
//   }, [chatMessages]);
  

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!selectedChat || !details?.chat?.length) return;
//       try {
//         const response = await fetch("http://localhost:3000/api/chat/messages", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ messageIds: details.chat }),
//         });

//         if (!response.ok) throw new Error("Failed to fetch messages");

//         const messages = await response.json();
//         setChatMessages(messages);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchMessages();
//   }, [selectedChat, details?.chat]);

//   useEffect(() => {
//     if (!selectedChat || !userId) return;

//     socket.emit("join", { userId });
//   }, [selectedChat, userId]);



//   const handleSendMessage = (imageUrl = null) => {
//     if ((!message.trim() && !imageUrl) || !userId || !selectedChat?.reciverobjectid) {
//       console.error("Missing required data:", { message, userId, selectedChat, imageUrl });
//       return;
//     }
  
//     const formattedTime = new Date().toLocaleString("en-US", {
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     });
  
//     const newMessage = {
//       sender: "You",
//       text: message || null,
//       time: formattedTime,
//       imageUrl: imageUrl ? `http://localhost:3000${imageUrl}` : null,
//     };
  
//     setChatMessages((prevMessages) => [...prevMessages, newMessage]);
  
//     socket.emit("privateMessage", {
//       reciverId,
//       senderId: userId,
//       receiverobjectId: selectedChat.reciverobjectid,
//       message: message || null,
//       imageUrl: imageUrl ? `http://localhost:3000${imageUrl}` : null,
//     });
  
//     setMessage("");
//     setImages([]);
//     setImgServer([]);
//   };
//   useEffect(() => {
//     if (!reciverId) return;
  
//     const handleIncomingMessage = ({ senderIdbyserver, message, time, imageUrl }) => {
//       const formattedTime = new Date(time).toLocaleString("en-US", {
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       });
  
//       // Only update if the message is for the current receiver
//       if (senderIdbyserver === reciverId) {
//         setChatMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             sender: details.userName,
//             text: message || null,
//             time: formattedTime,
//             imageUrl: imageUrl || null,
//           },
//         ]);
//       }
//     };
  
//     // Make sure to listen to the socket message correctly
//     socket.on("privateMessage", handleIncomingMessage);
  
//     return () => {
//       socket.off("privateMessage", handleIncomingMessage); // Clean up the listener
//     };
//   }, [reciverId, details]);
    

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImages([reader.result]);
//     };
//     reader.readAsDataURL(file);
//     setImgServer([file]);
//   };

//   const shareImages = async () => {
//     if (imgforserver.length === 0) return;

//     const formData = new FormData();
//     formData.append("image", imgforserver[0]);

//     try {
//       const response = await fetch("http://localhost:3000/upload/uploadPic", {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) throw new Error("Upload failed");

//       const result = await response.json();
//       const uploadedImageUrl = result.imageUrl;

//       handleSendMessage(uploadedImageUrl); // Send image after uploading
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   return (
//     <div className={styles.chatContainer}>
//       {selectedChat ? (
//         <>
//           <div className={styles.detailsdiv}>
//             <div className={styles.dpimg}>
//               <img src={`http://localhost:3000${details.dp}`} alt={details.userName} />
//             </div>
//             <div className={styles.reciverdetails}>
//               <span className={styles.recivername}>{details.userName}</span>
//               <br />
//               <span>{details.livestatus}</span>
//             </div>
//             <div  className={styles.sidedeta}>
//               <div className={styles.funct}>
//               <Button>
//                 <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368">
//                   <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
//                 </svg>
//               </Button>
//               <Button>
//                 <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368">
//                   <path d="M479.79-192Q450-192 429-213.21t-21-51Q408-294 429.21-315t51-21Q510-336 531-314.79t21 51Q552-234 530.79-213t-51 21Zm0-216Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm0-216Q450-624 429-645.21t-21-51Q408-726 429.21-747t51-21Q510-768 531-746.79t21 51Q552-666 530.79-645t-51 21Z" />
//                 </svg>
//               </Button>
//               </div>
//              <span>last seen :{details.lastseen}</span>
             
//             </div>
            
//           </div>

//           <div className={styles.chatdetails}>
//             {chatMessages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={msg.sender === "You" || msg.senderId === userId ? styles.sent : styles.received}
//                 ref={index === chatMessages.length - 1 ? lastMessageRef : null}
//               >
//                 {msg.imageUrl ? (
//                   <a href={msg.imageUrl} download target="_blank">
//                   <img
//                     src={msg.imageUrl}
//                     alt="Sent Image"
//                     className={styles.chatImage}
//                     style={{ cursor: 'pointer' }}
//                   />
//                 </a>
//                 ) : (
//                   <p>
//                     {msg.text} <span>{msg.time}</span>
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>

          // <div className={styles.inputsection}>
          //   <div
          //     className={styles.filldiv}
          //     onClick={() => fileInputRef.current && fileInputRef.current.click()}
          //   >
          //     <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="#5f6368">
          //       <path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z" />
          //     </svg>
          //     <input 
          //       type="file"
          //       ref={fileInputRef}
          //       style={{ display: "none" }}
          //       onChange={handleFileSelect}
          //     />
          //   </div>

          //   {images.length > 0 && (
          //     <div className={styles.showfile}>
          //       <div className={styles.selectfile}>
          //         {images.map((img, idx) => (
          //           <img key={idx} src={img} alt="Selected" className={styles.previewImg} />
          //         ))}
          //       </div>
          //       <button onClick={shareImages}>
          //         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" style={{ cursor: "pointer" }}>
          //           <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
          //         </svg>
          //       </button>
          //     </div>
          //   )}

          //   <button onClick={() => setShowEmojiPicker((prev) => !prev)} className={styles.emojiButton}>
          //     😀
          //   </button>

          //   {showEmojiPicker && (
          //     <div className={styles.emojiPicker}>
          //       <EmojiPicker
          //         onEmojiClick={(emojiObject) => {
          //           setMessage((prevMessage) => prevMessage + emojiObject.emoji);
          //         }}
          //       />
          //     </div>
          //   )}

          //   <div className={styles.inputdiv}>
          //     <Input
          //       placeholder="Type a message"
          //       value={message}
          //       onChange={(e) => {
          //         setShowEmojiPicker(false);
          //         setMessage(e.target.value);
          //       }}
          //       onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          //     />
          //   </div>

          //   {message ? (
          //     <svg
          //       onClick={() => handleSendMessage()}
          //       xmlns="http://www.w3.org/2000/svg"
          //       height="24px"
          //       viewBox="0 -960 960 960"
          //       width="24px"
          //       fill="#5f6368"
          //       style={{ cursor: "pointer" }}
          //     >
          //       <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
          //     </svg>
          //   ) : (
          //     <svg
          //       xmlns="http://www.w3.org/2000/svg"
          //       height="24px"
          //       viewBox="0 -960 960 960"
          //       width="24px"
          //       fill="#5f6368"
          //     >
          //       <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Z" />
          //     </svg>
          //   )}
          // </div>
//         </>
//       ) : (
//         <p>Select a chat to start messaging.</p>
//       )}
//     </div>
//   );
// }

// export default ChatContainer;
// version 2

import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import styles from "./style.module.css";
import Input from "../../component/Input";
import Button from "../Button";
import { Chatofuser } from '../../API/chatofuser';
const socket = io("https://wback-06q5.onrender.com");

function ChatContainer({ reciverId, selectedChat}) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const lastMessageRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imgforserver, setImgServer] = useState([]);
  const fileInputRef = useRef(null);
const [details, setDetails] = useState([]);
const [status, setStatus] = useState(" ");
const [lastActivity, setLastActivity] = useState(Date.now());
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [chatMessages]);


useEffect(() => {
  const fetchChat = async () => {
    try {
      const response = await Chatofuser(userId, reciverId);
      setDetails(response);
    } catch (error) {
      console.error("Error fetching chat:", error);
      setDetails([]);
    }
  };

  if (!selectedChat || !userId || !reciverId) return;

  // socket.on("chat_updated", () => {
  //   fetchChat(); // Fetch new chats when an update occurs
  // });

   fetchChat();

  // Set interval to check user status every 10 seconds
  const id = setInterval(() => {
    const currentTime = Date.now();
    // If 10 seconds passed without activity, update status
    if (currentTime - lastActivity > 10000) {
      if (details.livestatus === "Online") {
        setStatus("Last seen: " + details.lastseen); // Show last seen if user was online
      }else
      if(details.livestatus === "Offline")
      {
          setStatus("Last seen: " + details.lastseen); // Show last seen if user was online
      }
    }
  }, 10000);



  return () => {
    clearInterval(id); // Cleanup the interval on component unmount
  };
}, [reciverId, selectedChat, userId, lastActivity, details.livestatus, details.lastseen]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat || !details?.chat?.length) return;
      try {
        const response = await fetch("https://wback-06q5.onrender.com/api/chat/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messageIds: details.chat }),
        });

        if (!response.ok) throw new Error("Failed to fetch messages");

        const messages = await response.json();
        setChatMessages(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedChat, details?.chat]);

  useEffect(() => {
    if (!selectedChat || !userId) return;

    socket.emit("join", { userId });
  }, [selectedChat, userId]);



  const handleSendMessage = (imageUrl = null) => {
    if ((!message.trim() && !imageUrl) || !userId || !selectedChat?.reciverobjectid) {
      console.error("Missing required data:", { message, userId, selectedChat, imageUrl });
      return;
    }
  
    const formattedTime = new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute:"2-digit",
      hour12: true,
    });
  
    const newMessage = {
      sender: "You",
      text: message || null,
      time: formattedTime,
      imageUrl: imageUrl ? `https://wback-06q5.onrender.com${imageUrl}` : null,
    };
  
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
  
    socket.emit("privateMessage", {
      reciverId,
      senderId: userId,
      receiverobjectId: selectedChat.reciverobjectid,
      message: message || null,
      imageUrl: imageUrl ? `https://wback-06q5.onrender.com${imageUrl}` : null,
    });
  
    setMessage("");
    setImages([]);
    setImgServer([]);
    // setLastActivity(Date.now()); // Update last activity time when a message is sent
setStatus("Online")
  };

  useEffect(() => {
    if (!reciverId) return;
  
    const handleIncomingMessage = ({ senderIdbyserver, message, time, imageUrl }) => {
     
      setStatus("Online"); // Show Online when there's activity
      const formattedTime = new Date(time).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
  
      // Only update if the message is for the current receiver
      if (senderIdbyserver === reciverId) {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: details.userName,
            text: message || null,
            time: formattedTime,
            imageUrl: imageUrl || null,
          },
        ]);
      setLastActivity(Date.now());
      }
      fetchChat();
    };
  
    // Make sure to listen to the socket message correctly
    socket.on("privateMessage", handleIncomingMessage);
  
    return () => {
      socket.off("privateMessage", handleIncomingMessage); // Clean up the listener
    };
  }, [reciverId, details]);
    

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImages([reader.result]);
    };
    reader.readAsDataURL(file);
    setImgServer([file]);
  };

  const shareImages = async () => {
    if (imgforserver.length === 0) return;

    const formData = new FormData();
    formData.append("image", imgforserver[0]);

    try {
      const response = await fetch("https://wback-06q5.onrender.com/upload/uploadPic", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      const uploadedImageUrl = result.imageUrl;

      handleSendMessage(uploadedImageUrl); // Send image after uploading
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className={styles.chatContainer}>
      {selectedChat ? (
        <>
          <div className={styles.detailsdiv}>
            <div className={styles.dpimg}>
              <img src={`https://wback-06q5.onrender.com${details.dp}`} alt={details.userName} />
            </div>
            <div className={styles.reciverdetails}>
              <span className={styles.recivername}>{details.userName}</span>
              <br />
              <span>
              {
                 details.livestatus === "Offline"
                    ? `Offline` // If offline, show "Offline"
                      : status // Display "Online" or "Last seen" based on status
                   }
               </span>
            </div>
            <div  className={styles.sidedeta}>
              <div className={styles.funct}>
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368">
                  <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
                </svg>
              </Button>
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368">
                  <path d="M479.79-192Q450-192 429-213.21t-21-51Q408-294 429.21-315t51-21Q510-336 531-314.79t21 51Q552-234 530.79-213t-51 21Zm0-216Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm0-216Q450-624 429-645.21t-21-51Q408-726 429.21-747t51-21Q510-768 531-746.79t21 51Q552-666 530.79-645t-51 21Z" />
                </svg>
              </Button>
              </div>
         
             
            </div>
            
          </div>

          <div className={styles.chatdetails}>
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "You" || msg.senderId === userId ? styles.sent : styles.received}
                ref={index === chatMessages.length - 1 ? lastMessageRef : null}
              >
                {msg.imageUrl ? (
                  <a href={msg.imageUrl} download target="_blank">
                  <img
                    src={msg.imageUrl}
                    alt="Sent Image"
                    className={styles.chatImage}
                    style={{ cursor: 'pointer' }}
                  />
                </a>
                ) : (
                  <p>
                    {msg.text} <span>{msg.time}</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className={styles.inputsection}>
            <div
              className={styles.filldiv}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="#5f6368">
                <path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z" />
              </svg>
              <input 
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
            </div>

            {images.length > 0 && (
              <div className={styles.showfile}>
                <div className={styles.selectfile}>
                  {images.map((img, idx) => (
                    <img key={idx} src={img} alt="Selected" className={styles.previewImg} />
                  ))}
                </div>
                <button onClick={shareImages}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" style={{ cursor: "pointer" }}>
                    <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                  </svg>
                </button>
              </div>
            )}

            <button onClick={() => setShowEmojiPicker((prev) => !prev)} className={styles.emojiButton}>
              😀
            </button>

            {showEmojiPicker && (
              <div className={styles.emojiPicker}>
                <EmojiPicker
                  onEmojiClick={(emojiObject) => {
                    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
                  }}
                />
              </div>
            )}

            <div className={styles.inputdiv}>
              <Input
                placeholder="Type a message"
                value={message}
                onChange={(e) => {
                  setShowEmojiPicker(false);
                  setMessage(e.target.value);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
            </div>

            {message ? (
              <svg
                onClick={() => handleSendMessage()}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
                style={{ cursor: "pointer" }}
              >
                <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Z" />
              </svg>
            )}
          </div>
        </>
      ) : (
        <p>Select a chat to start messaging.</p>
      )}
    </div>
  );
}

export default ChatContainer;

