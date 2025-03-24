// Client-side: Function to handle account deletion
export const DeleteAccount = async () => {
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

    const MyId = localStorage.getItem("userId"); // Getting the user ID from localStorage
    // console.log("My ID:", MyId);
  
    // If there is no user ID in localStorage, show an error and return
    if (!MyId) {
      alert("User ID not found in localStorage");
      return;
    }
  
    try {
      // Making the API request to delete the account
      const response = await fetch('https://wback-06q5.onrender.com/api/auth/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({ user:email,id: MyId }) // Sending the user ID to the server
      });
  
      // Handling the response from the server
      const data = await response.json();
      if (response.ok) {
       // alert("Account deleted successfully");
        localStorage.clear();
        sessionStorage.clear();
      } else {
        alert(data.message || "Failed to delete account");
      }
      return data;
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting the account.");
    }
  };
  