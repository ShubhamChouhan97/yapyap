// import React, { useState, useEffect } from 'react';
// import styles from './style.module.css';
// import Input from '../../component/Input';
// import Button from '../../component/Button';
// import Login from '../Login';
// import { forgotpass } from '../../API/forgotpass';
// import { ToastContainer, toast } from 'react-toastify';
// function ForgotPass() {
//   const [formData, setFormData] = useState({
//     email: '',
//     captchaAnswer: '',
//   });
//   const [login, setLogin] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, sum: 0 });

//   useEffect(() => {
//     const num1 = Math.floor(Math.random() * 10) + 1;
//     const num2 = Math.floor(Math.random() * 10) + 1;
//     setCaptcha({ num1, num2, sum: num1 + num2 });
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   if (login) {
//     return <Login />;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (parseInt(formData.captchaAnswer) !== captcha.sum) {
//       setError('Wrong verification code. Please try again.');
//       return;
//     }

//     setLoading(true);
//     try {
//       await forgotpass(formData.email);
//       toast.success('Password reset link sent successfully!', {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//      // console.log('Password reset link sent to', formData.email);
//       setTimeout(() => setLogin(true), 2000); // Redirect to login after 2 sec
//     } catch (err) {
//       toast.error('Error sending reset link.');
//       setError('Failed to send reset link. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.main}>
//     <ToastContainer />
//       <div className={styles.center}>
//         {error && <p className={styles.error}>{error}</p>}
//         <h1>Forgot Password</h1>
//         <form onSubmit={handleSubmit} className={styles.iinp}>
//           <div className={styles.inputbox}>
//             <Input
//               type="email"
//               name="email"
//               placeholder="Enter Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <span className={styles.signupText} onClick={() => setLogin(true)}>
//             Login
//           </span>
//           <div className={styles.capcha}>
//             <p>Verify Sum: {captcha.num1} + {captcha.num2} = ?</p>
//             <div className={styles.inputcap}>
//               <Input
//                 type="text"
//                 name="captchaAnswer"
//                 placeholder="Enter sum"
//                 value={formData.captchaAnswer}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//           <div className={styles.btn}>
//             <Button type="submit" disabled={loading}>
//               {loading ? <div className={styles.loader}></div> : 'Reset'}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ForgotPass;

// version 2
import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import Input from '../../component/Input';
import Button from '../../component/Button';
import Login from '../Login';
import { forgotpass } from '../../API/forgotpass';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Mail } from "lucide-react";

function ForgotPass() {
  const [formData, setFormData] = useState({
    email: '',
    captchaAnswer: '',
  });
  const [login, setLogin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, sum: 0 });

  // Function to generate a new captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1, num2, sum: num1 + num2 });
    setFormData({ ...formData, captchaAnswer: '' }); // Reset captcha input
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (login) {
    return <Login />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (parseInt(formData.captchaAnswer) !== captcha.sum) {
      setError('Wrong verification code. Please try again.');
      return;
    }

    setLoading(true);
    try {
      await forgotpass(formData.email);
      toast.success('Password reset link sent successfully!', {
       position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => setLogin(true), 2000);
    } catch (err) {
      toast.error('Error sending reset link.',{
        position: "top-center"
      });
      setError('Failed to send reset link. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <ToastContainer />
      <div className={styles.center}>
        {error && <p className={styles.error}>{error}</p>}
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit} className={styles.iinp}>
          <div className={styles.inputbox}>
           <Mail className='text-gray-500'/>
            <Input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.signupText} onClick={() => setLogin(true)}>
            Login
          </span>

          {/* Captcha Section */}
          <div className={styles.capcha}>
            <p>
              Verify Sum: {captcha.num1} + {captcha.num2} = ?{' '}
              <span className={styles.refresh} onClick={generateCaptcha}>
                🔄
              </span>
            </p>
            <div className={styles.inputcap}>
              <Input
                type="text"
                name="captchaAnswer"
                placeholder="Enter sum"
                value={formData.captchaAnswer}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.btn}>
            <Button type="submit" disabled={loading}>
              {loading ? <div className={styles.loader}></div> : 'Reset'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPass;
