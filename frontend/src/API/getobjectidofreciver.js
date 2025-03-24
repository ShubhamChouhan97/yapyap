export const GetIdget = async () => {
  
    
    const response = await fetch('https://wback-06q5.onrender.com/api/auth/getidget', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Allows cookies to be sent and
        });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    // console.log("dsc",data);
    return data;
    }
