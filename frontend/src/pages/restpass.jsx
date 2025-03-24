import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; 

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    if (!token) return;

   // console.log("Verifying token:", token);

    axios
      .get(`https://wback-06q5.onrender.com/api/auth/verifyresettoken?token=${token}`)
      .then((res) => {
        setIsValidToken(true);
        setError('');
      })
      .catch((err) => {
        setIsValidToken(false);
        toast.error(err.response?.data?.message,{position:"top-center"});
        setTimeout(() => {
          navigate("/login"); // Navigate after 3 seconds
         }, 5000);
        setError('Invalid or expired token.');
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    if (password !== confirmPassword) {
      toast.error("Passwords do not match",{position:"top-center"});
      return;
    }
    if ( password < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "top-center",
        autoClose: 3000,
      });
    }

    setLoading(true);
    try {
      await axios.post(`https://wback-06q5.onrender.com/api/auth/resetpassword`, {
        token,
        password,
      });
      toast.success("Password reset successfully! Redirecting to login...", { position: "top-center" });
               setTimeout(() => {
                navigate("/login"); // Navigate after 3 seconds
               }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message,{position:"top-center"});
      setTimeout(() => {
        navigate("/login"); // Navigate after 3 seconds
       }, 5000);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.mainContainer}>
     <ToastContainer/>
      <div style={styles.centeredContainer}>
        <h2 style={styles.heading}>Reset Your Password</h2>
        {error && <p style={styles.error}>{error}</p>}
        {!isValidToken && <p style={styles.info}>Verifying token...</p>}
        
        {isValidToken && (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#fffff",
    padding: "20px",
  },
  centeredContainer: {
    backgroundColor: "#eeeeee",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    width:"95%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#26d367",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
    cursor: "not-allowed",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  info: {
    color: "#666",
    fontSize: "14px",
  },
};

export default ResetPassword;
