export const tokencheck = async () => {
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
      const response = await fetch("https://wback-06q5.onrender.com/api/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: email }),
        credentials: "include", // Allows cookies to be sent and received
      });
  
      const data = await response.json();
      
      // Return response status and data
      return data;
    } catch (error) {
      console.error("Error:", error);
      return { success: false, data: { message: "Something went wrong!" } };
    }
  };
  