// src/api/logout.js
export const logoutUser = async () => {
  let email = localStorage.getItem("email");
    
  // Handle possible email format in localStorage
  if (email && email.startsWith("{") && email.endsWith("}")) {
    try {
      email = JSON.parse(email).email;
    } catch (error) {
      console.error("Error parsing email from localStorage:", error);
      return { success: false, data: { message: "Invalid email format." } };
    }
  }

  // Ensure email is available
  if (!email) {
    return { success: false, data: { message: "No email found in localStorage." } };
  }
  
  
    try {
      const response = await fetch('https://wback-06q5.onrender.com/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Ensures cookies are included in the request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user:email}),
      });
  
      if (response.ok) {
        localStorage.clear();
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  