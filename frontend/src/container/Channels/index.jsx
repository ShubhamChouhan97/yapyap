import React from 'react'
import styles from './style.module.css'
import Input from '../../component/Input'
import Channelstruct from '../../component/Channelstruct';



const channels = [
    {
      "id": 1,
      "name": "Matlabi Duniya",
      "message": "React 😂 if you agree!",
      "time": "9:48 am",
      "count": 230,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"
    },
    {
      "id": 2,
      "name": "Who Cares?",
      "message": "😂",
      "time": "9:47 am",
      "count": 64,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"    },
    {
      "id": 3,
      "name": "No One Cares",
      "message": "😂",
      "time": "9:47 am",
      "count": 200,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"
    },
    {
      "id": 4,
      "name": "News18 India",
      "message": "भारत में कितने बजे शुरू होंगे मुकाबले, कब, कहां और कैसे देख...",
      "time": "9:05 am",
      "count": 159,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"
    },
    {
      "id": 5,
      "name": "Narendra Modi",
      "message": "I pay homage to Chhatrapati Shivaji Maharaj on his Jaya...",
      "time": "8:58 am",
      "count": 20,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"
    },
    {
      "id": 6,
      "name": "LetsUpgrade",
      "message": "Reminder: Day 2 starting in 20 Minutes!! ⏳ Hey Every...",
      "time": "Yesterday",
      "count": 79,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"
    },
    {
      "id": 7,
      "name": "University",
      "message": "https://www.instagram.com/p/DGAar/?utm_source=...",
      "time": "Saturday",
      "count": 8,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"
    },
    {
      "id": 8,
      "name": "Indian Cricket Team",
      "message": "What comes along with the experience of scoring 3️⃣2️⃣ O...",
      "time": "10/2/2025",
      "count": 12,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"
    },{
        "id": 4,
        "name": "News18 India",
        "message": "भारत में कितने बजे शुरू होंगे मुकाबले, कब, कहां और कैसे देख...",
        "time": "9:05 am",
        "count": 159,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"
      },
      {
        "id": 5,
        "name": "Narendra Modi",
        "message": "I pay homage to Chhatrapati Shivaji Maharaj on his Jaya...",
        "time": "8:58 am",
        "count": 20,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"
      },
      {
        "id": 6,
        "name": "LetsUpgrade",
        "message": "Reminder: Day 2 starting in 20 Minutes!! ⏳ Hey Every...",
        "time": "Yesterday",
        "count": 79,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"
      },
      {
        "id": 7,
        "name": "University",
        "message": "https://www.instagram.com/p/DGAaC15/?utm_source=...",
        "time": "Saturday",
        "count": 8,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"
      },
      {
        "id": 8,
        "name": "Indian Cricket Team",
        "message": "What comes along with the experience of scoring 3️⃣2️⃣ O...",
        "time": "10/2/2025",
        "count": 12,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"
      }
  ];
  
  
  


function Channels() {
  return (
    <div className={styles.channeldiv}>
      <div className={styles.top}>
        <p className={styles.p1}>
            Channels
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
      </div>
      <div className={styles.inputsection}>
        <div className={styles.inputdiv}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
        <Input placeholder="Search"/>
        </div>
      </div>

          <div className={styles.channellist}>
          <div>
          {channels.length > 0 ? (
                    channels.map((channel) => (
                        <Channelstruct
                            key={channel.id}
                            name={channel.name}
                            message={channel.message}
                            time={channel.time}
                            count={channel.count}
                            image={channel.image}
                        />
                    ))
                ) : (
                    <p>No channels available</p>
                )}
      </div>
            </div>  
    </div>
  )
}

export default Channels
