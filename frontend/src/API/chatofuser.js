export const Chatofuser = async (senderatid,reciveratid) => {
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
    const response = await fetch('https://wback-06q5.onrender.com/api/chat/ofuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Allows cookies to be sent and
        body: JSON.stringify({
            user:email,
            reciveratid:reciveratid,
            senderatid:senderatid
        })
        });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
    }
