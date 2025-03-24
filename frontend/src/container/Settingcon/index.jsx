import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css';
import { logoutUser } from '../../API/logout';
import { userdetail } from '../../API/userdetails';
import ClipLoader from "react-spinners/ClipLoader";
import Login from '../Login';
import { io } from "socket.io-client";
const socket = io("https://wback-06q5.onrender.com");
import { ToastContainer, toast } from "react-toastify"; 

function Settingcon() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    dp: '',
    userName: 'User',
    about: 'No bio available'
  });

  // Backend server URL (adjust this based on your actual server URL)
  const SERVER_URL = "https://wback-06q5.onrender.com";

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const details = await userdetail();
        //console.log("User details:", details.data);

        // Ensure the correct image URL
        const profilePic = details.data.dp
          ? `${SERVER_URL}${details.data.dp}` // If the backend sends only the path
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"; // Default fallback image

        setUserData({ ...details.data, dp: profilePic });
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, []);
  const MyId = localStorage.getItem("userId");
  
 const logout = async () =>{
  await socket.emit("offline",{MyId});
  await logoutUser();
  toast.success("Logged out successfully!", { position: "top-center" });
        localStorage.clear();
        setTimeout(() => {
          navigate("/login"); // Navigate after 3 seconds
        }, 3000);

 }
  return (
    <div className={styles.main}>
     <ToastContainer/>
      {loading ? (
        <div className={styles.loadingContainer}>
          <ClipLoader color="blue" size={50} />
        </div>
      ) : (
        <div className={styles.seetingdiv}>
          <div className={styles.top}>
            <p className={styles.p1}>Settings</p>
  
            <div className={styles.accountinfo}>
              <div className={styles.imgdiv}>
                <img 
                  src={userData.dp} 
                  alt="Profile"
                  onError={(e) => e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi43oV03AlfQeLbkWwHbsDLoybu5_sYcs2xg&s"} // Fallback if image fails to load
                />
              </div>
              <div className={styles.info}>
                <p className={styles.p2}>{userData.userName || "User"}</p>
                <p className={styles.p3}>{userData.about || "No Bio availabe"}</p>
              </div>
            </div>
          </div>
  
          <div className={styles.bottomcontainer}>
            <div className={styles.menu}>
              <div className={styles.menu_item}>Account</div>
              <div className={styles.menu_item}>Privacy</div>
              <div className={styles.menu_item}>Chats</div>
              <div className={styles.menu_item}>Notifications</div>
              <div className={styles.menu_item}>Keyboard shortcuts</div>
              <div className={styles.menu_item}>Help</div>
              <div className={styles.logout} onClick={logout}>
                Log out
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settingcon;
