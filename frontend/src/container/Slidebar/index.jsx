import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import { useNavigate } from "react-router-dom";
import addchat from '../../assets/message.png';
import dot from '../../assets/dots.png';
import searchimg from '../../assets/search.png';
import wlogo from '../../assets/whatsapp.png';
import Button from '../../component/Button';
import Input from '../../component/Input';
import Chatlist from '../../component/Chatlist';
import { fetchChat } from '../../API/fetchchat';
import { io } from "socket.io-client";
const socket = io("https://wback-06q5.onrender.com"); // Ensure this is defined
import { logoutUser } from '../../API/logout';
import { DeleteAccount } from '../../API/DeleteAccount';
import { ToastContainer, toast } from "react-toastify"; 


const Slidebar = ({ onChatSelect }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeButton, setActiveButton] = useState('All'); // Initialize with 'All' as active
  const [chats, setChats] = useState([]);

  // Get email from local storage
  const email = localStorage.getItem("email");
 
  const getChats = async () => {
    if (email) {
      try {
        const fetchedChats = await fetchChat();
        setChats(fetchedChats);
        
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    }
  };

  useEffect(() => {
    getChats(); // Initial fetch when the component mounts

    // Listen for real-time chat updates from the backend
    socket.on("chat_updated", () => {
    //  console.log("Chat updated, fetching new chats...");
      getChats(); // Fetch new chats when an update occurs
    });

    return () => {
      socket.off("chat_updated"); // Clean up event listener on unmount
    };
  }, [email]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const deleteaccountbtn = async ()=>{
    const value = prompt("Are you sure you want to delete your account? If yes, please input your email for confirmation.");
    let email = localStorage.getItem("email");
    if (email.startsWith("{") && email.endsWith("}")) {
      email = JSON.parse(email).email;
  }
  
  if (value === email) {
    await DeleteAccount();
    toast.success("Account deleted successfully!", { position: "top-center" });
    setTimeout(() => {
      navigate("/"); // Navigate after 3 seconds
    }, 3000);
  } else {
    toast.error("Email does not match! Account deletion failed.", {
      position: "top-center",
    })}

  }
  const Logoutbtn = async () => {
    try {
      await logoutUser(); // Ensure this function handles errors properly
      toast.success("Logged out successfully!", { position: "top-center" });
      localStorage.clear();
      setTimeout(() => {
        navigate("/login"); // Navigate after 3 seconds
      }, 3000);
    } catch (error) {
      toast.error("Logout failed. Try again!", { position: "top-center" });
    }
  };

  return (
    <div className={styles.slidebar}>
    <ToastContainer/>
      <div className={styles.head}>
      <div className={styles.chats}>
        <h2>Chats</h2>
      </div>
      <div className={styles.fun}>
        <img
          src={addchat}
          alt="Add Chat"
          className={styles.icon}
        />
        <div
          className={styles.dotContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={dot}
            alt="Options"
            className={styles.icon}
          />
          {isHovered && (
            <div className={styles.dropdown}>
              <button className={styles.dropdownButton} onClick={deleteaccountbtn}>Delete Account </button>
              <button className={styles.dropdownButton} onClick={Logoutbtn}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
      
      <div className={styles.center}>
        <div className={styles.inputbox}>
          <div className={styles.inputsection}>
            <img src={searchimg} alt="search" className={styles.searchicon} />
            <Input className={styles.inputt}
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div className={styles.selectbtn}>
          <Button onClick={() => handleButtonClick('All')} active={activeButton === 'All'}>All</Button>
          <Button onClick={() => handleButtonClick('Unread')} active={activeButton === 'Unread'}>Unread</Button>
          <Button onClick={() => handleButtonClick('Favourites')} active={activeButton === 'Favourites'}>Favourites</Button>
          <Button onClick={() => handleButtonClick('Groups')} active={activeButton === 'Groups'}>Groups</Button>
        </div>
      </div>

      <div className={styles.chatcontainer}>
        <Chatlist chats={filteredChats} onSelectChat={onChatSelect} />
      </div>
      
      <div className={styles.slidebardown}>
        <img className={styles.wlogo} src={wlogo} alt="WhatsApp Logo" />
        <h2>YapYup a Chat App</h2>
      </div>
    </div>
  );
};

export default Slidebar;
