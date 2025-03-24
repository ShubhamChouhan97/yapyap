import React, { useState,useEffect } from 'react';
import styles from './styles.module.css'
import logo from '../../assets/multiple-users-silhouette.png'
import comm from '../../assets/community.png'
import { fetchChat } from '../../API/fetchchat';
import Groupchatlist from '../../component/Groupchatlist';

function Community() {
  const [showContacts, setShowContacts] = useState(false);
const [chats, setChats] = useState([]);
// Get email from local storage
  const email = localStorage.getItem("email");
 
  const getChats = async () => {
    if (email) {
      try {
        const fetchedChats = await fetchChat();
        console.log("ddd",fetchedChats);
        setChats(fetchedChats);
        
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    }
  };

  useEffect(() => {
    getChats(); // Initial fetch when the component mounts

    // Listen for real-time chat updates from the backend
  }, [email]);


  function creategroup() {
    setShowContacts((prev) => !prev); // Toggle visibility
  }

  

  return (
    <div className={styles.communitydiv}>
      <div className={styles.top}>
        <p className={styles.p1}>Groups</p>
        <div className={styles.addcomm} onClick={creategroup}>
            <div className={styles.imgdiv}>
            <img src={logo} alt="logo" />
            </div>
           <p className={styles.p2}>New Groups</p>
        </div>
      </div>

     <div className={styles.bottomcontainer}>
        <img src={comm} alt="community" />
        
        </div> 

        {showContacts && (
        <div className={styles.contacts}>
         <h1>Contacts list</h1>
         <div>
         {/* <Chatlist chats={chats} onSelectChat={onChatSelect} /> */}
         <Groupchatlist chats= { chats}/>
         </div>
        </div>
      )}
    </div>
  )
}

export default Community
