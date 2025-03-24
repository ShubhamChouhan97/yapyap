import React, { useState } from "react";
import styles from "./style.module.css";
import Input from "../../component/Input";
import Button from "../../component/Button";
import Login from "../Login";
import { signupUser } from "../../API/signup";
import { Mail, Lock, User } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

function Signup() {
  const [showSignin, setShowSignin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "top-center",
        autoClose: 3000,
      });
      return; // Stop form submission
    }

    setLoading(true); // Start loading

    const result = await signupUser(formData);
    console.log("hello");
    if (result.success) {
      toast.success(result.data.message, { autoClose: 3000 ,position: "top-center"});
      setTimeout(() => setShowSignin(true), 2000);
    } else {
      toast.error(result.data.message || "Registration failed", { autoClose: 3000 ,position: "top-center"});
    }

    setLoading(false); // Stop loading
  };

  if (showSignin) {
    return <Login />;
  }

  return (
    <div className={styles.main}>
      <ToastContainer />
      <div className={styles.center}>
        <div className={styles.heading}>
          <h2>Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.iinp}>
          <div className={styles.inputbox}>
          <User className="test-gray-500"/>
            <Input
              type="text"
              name="userName"
              placeholder="Full Name"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputbox}>
          <Mail className="text-gray-500" />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputbox}>
          <Lock className="text-gray-500" />
            <Input
              type="password"
              name="password"
              placeholder="Password (Min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles.btn}>
            <Button type="submit" disabled={loading}>
              {loading ? <span className={styles.spinner}></span> : "Register"}
            </Button>
          </div>
        </form>
        <div className={styles.botm}>
          <p>
            Already have an account?{" "}
            <span className={styles.signinText} onClick={() => setShowSignin(true)}>
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
