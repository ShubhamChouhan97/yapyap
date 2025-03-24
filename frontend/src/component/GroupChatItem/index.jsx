import React from "react";
import styles from './styles.module.css';

const GroupChatItem = ({ groupChat}) => {
  const imageUrl = `https://wback-06q5.onrender.com${groupChat.dp}`;

  return (
    <div className={styles.chatmain}>
      <div className={styles.imgdiv}>
        <img 
          src={imageUrl} 
          alt={groupChat.name} 
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className={styles.deee}>
        <p className={styles.chatname}>{groupChat.name}</p>
        <p className={styles.about}>{groupChat?.about || "Bio Not avaliable"}</p>

      </div>
    </div>
  );
};

export default GroupChatItem;
