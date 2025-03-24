import React from "react";
import GroupChatItem from "../GroupChatItem"; // Assuming GroupChatItem is a similar component to ChatItem
import styles from './style.module.css';

const GroupChatList = ({ chats }) => {
  console.log("Group chats are", chats);

  return (
    <div className={styles.chatlisttt}>
      <div className={styles.chatlistitemc}>
        {chats.length > 0 ? (
          chats.map((groupChat) => (
            <GroupChatItem key={chats.id} groupChat={groupChat} />
          ))
        ) : (
          <div className={styles.empty}>
            <p>No Groups Available to Chat, Share more groups to connect</p>
          </div>
        )}
      </div>
      <div className={styles.cretebtn}>
      <button className={styles.create}>Create Group</button>
      </div>
     
    </div>
  );
};

export default GroupChatList;
