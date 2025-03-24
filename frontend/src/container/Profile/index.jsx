import { useState, useEffect } from "react";
import { FaCamera, FaPen } from "react-icons/fa";
import style from "./style.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { userdetail } from "../../API/userdetails";
import { userUpdate } from "../../API/userUpdate";
import { ToastContainer, toast } from "react-toastify"; 

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    dp: "",
    userName: "User",
    about: "No bio available",
  });

  const [name, setName] = useState(userData.userName);
  const [about, setAbout] = useState(userData.about);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const details = await userdetail();
        if (details.success) {
          setUserData(details.data);
        }
      } catch (error) {
        toast.error("Error fetching user details:", {
          position: "top-center",
        })
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, []);

  useEffect(() => {
    setName(userData.userName || "User");
    setAbout(userData.about || "No bio available");
    setProfilePic(userData.dp ? `https://wback-06q5.onrender.com${userData.dp}` : "");
  }, [userData]);

  const updateUserData = async (updatedFields) => {
    try {
      const response = await userUpdate(updatedFields);
      if (response.success) {
        setUserData((prev) => ({ ...prev, ...updatedFields }));
      } else {
        toast.error("Failed to update user", {
          position: "top-center",
        })
        console.error("Failed to update user", response.data);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Image upload failed!", {
        position: "top-center",
      })
      return;
    }
    const storedData = localStorage.getItem("email");
    const email = storedData ? JSON.parse(storedData).email : null;
// console.log("email is ",email);
    const formData = new FormData();
    formData.append("profilePic", file);
    formData.append("email",email); // Send email with the image

    try {
      const response = await fetch("https://wback-06q5.onrender.com/upload/uploadProfilePic", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        const imageUrl = `https://wback-06q5.onrender.com${data.imageUrl}`;
        setProfilePic(imageUrl);
        updateUserData({ dp: data.imageUrl });
      } else {

        toast.error("Image upload failed!", {
          position: "top-center",
        })
        
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleNameChange = () => {
    const newName = prompt("Enter your name", name);
    if (newName && newName.trim() && newName !== name) {
      setName(newName);
      updateUserData({ userName: newName });
    }
  };

  const handleAboutChange = () => {
    const newAbout = prompt("Enter about text", about);
    if (newAbout && newAbout.trim() && newAbout !== about) {
      setAbout(newAbout);
      updateUserData({ about: newAbout });
    }
  };

  return (
    <div className={style.profileContainer}>
     <ToastContainer/>
      {loading ? (
        <div className={style.loadingContainer}>
          <ClipLoader color="blue" size={50} />
        </div>
      ) : (
        <div className={style.profileContent}>
          <h2 className={style.profileTitle}>Profile</h2>
          <label className={style.profilePicContainer}>
            {profilePic ? (
              <img src={profilePic} alt="Profile" className={style.profilePic} />
            ) : (
              <div className={style.profilePlaceholder}>
                <FaCamera size={24} />
                <span>ADD PROFILE PHOTO</span>
              </div>
            )}
            <input type="file" className={style.fileInput} onChange={handleImageUpload} />
          </label>

          <div className={style.profileSection}>
            <div className={style.profileRow}>
              <span>Your name</span>
              <button className={style.editButton} onClick={handleNameChange}>
                <FaPen size={16} />
              </button>
            </div>
            <p className={style.profileText}>{name}</p>
          </div>

          <div className={style.profileSection}>
            <div className={style.profileRow}>
              <span>About</span>
              <button className={style.editButton} onClick={handleAboutChange}>
                <FaPen size={16} />
              </button>
            </div>
            <p className={style.profileText}>{about}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
