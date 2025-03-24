export const forgotpass = async (email)=>{
//console.log("emaila at ",email);



const response = await fetch('https://wback-06q5.onrender.com/api/auth/forgotpass', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({email})
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
}