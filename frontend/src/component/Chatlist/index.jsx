
import React from "react";
import ChatItem from "../ChatItem";
import styles from './style.module.css';

const ChatList = ({ chats, onSelectChat }) => {
  // console.log("chat are",chats)
  return (
    <div className={styles.chatlisttt}>
      <div className={styles.chatlistitemc}>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} onSelectChat={onSelectChat} />
          
          ))
        ) : (
         <div  className={styles.empty}>
            <p>No Users Available to Chat,Share more users to connect</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;

