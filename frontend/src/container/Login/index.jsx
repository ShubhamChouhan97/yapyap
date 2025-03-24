// version 2
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { loginUser } from "../../API/login";
import SignUp from "../Signup";
import ForgotPass from "../ForgotPass";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; // Ensure Toastify styles are included
import { Mail, Lock  } from "lucide-react";
const socket = io("https://wback-06q5.onrender.com");

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [forgotPass, setForpass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const result = await loginUser(formData);
      if (result.success) {
        let userData = result.data.user;
        let id = userData._id;
  
        localStorage.setItem("email", JSON.stringify({ email: userData.email }));
        localStorage.setItem("userId", id);
        localStorage.setItem("token", result.data.token);
  
        // Emit socket event for user coming online
        socket.emit("online", { id });
  
        // Immediately update state to reflect the successful login
        toast.success(result.data.message, {
          position: "top-center"
        });
  
        setTimeout(() => {
          onLogin(true); // Update login state
          navigate("/"); // Navigate to main after 3 seconds
        }, 2000);
      } else {
        toast.error(result.data.message || "Login failed");
      }
    } catch (err) {
      console.log("Login error:", err);
      toast.error("An error occurred. Please try again.");
    }
  };
  

  if (showSignup) return <SignUp />;
  if (forgotPass) return <ForgotPass />;

  return (
    <div className={styles.main}>
      <ToastContainer /> {/* Toast container for notifications */}
      <div className={styles.center}>
        <div className={styles.heading}>
          <h2>Login</h2>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.iinp}>
          <div className={styles.inputbox}>
          <Mail className="text-gray-500" />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputbox}>
          <Lock className="text-gray-500" />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.signupText} onClick={() => setForpass(true)}>
            Forgot Password?
          </span>
          <div className={styles.btn}>
            <Button type="submit">Login</Button>
          </div>
        </form>

        <div className={styles.botm}>
          <p>
            Don't have an account?{" "}
            <span className={styles.signupText} onClick={() => setShowSignup(true)}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

