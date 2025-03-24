import React from 'react'
import Statusstructure from '../Statusstructure';
import styles from './style.module.css';
const whatsappStatus = [
  {
    picture: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    name: "John Doe",
    time: "10 minutes ago",
  },
  {
    picture: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    name: "Emma Watson",
    time: "20 minutes ago",
  },
  {
    picture: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    name: "Michael Smith",
    time: "30 minutes ago",
  },
  {
    picture: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    name: "Sophia Johnson",
    time: "1 hour ago",
  },
  {
    picture: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    name: "David Williams",
    time: "2 hours ago",
  },
  {
    picture: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    name: "Olivia Brown",
    time: "3 hours ago",
  },{
    picture: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    name: "John Doe",
    time: "10 minutes ago",
  },
  {
    picture: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    name: "Emma Watson",
    time: "20 minutes ago",
  },
  {
    picture: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    name: "Michael Smith",
    time: "30 minutes ago",
  },
  {
    picture: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    name: "Sophia Johnson",
    time: "1 hour ago",
  },
  {
    picture: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    name: "David Williams",
    time: "2 hours ago",
  },
  {
    picture: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    name: "Olivia Brown",
    time: "3 hours ago",
  },
];

function Otherstatus() {
  return (
    <div>
      <div className={styles.Otherstatuslist}>
        {whatsappStatus.length > 0 ? (
          whatsappStatus.map((status, index) => (
            <Statusstructure key={index} picture={status.picture} name={status.name} time={status.time} />
          ))
        ) : (
          <p>No statuses available</p>
        )}
      </div>
    </div>
  )
}

export default Otherstatus
