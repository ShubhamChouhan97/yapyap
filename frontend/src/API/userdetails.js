export const userdetail = async () => {
    let email = localStorage.getItem("email");

    if (!email) {
        // console.warn("No email found in localStorage.");
        return { success: false, data: { message: "Email not found!" } };
    }

    try {
        // Parse if email is stored as a JSON string
        if (email.startsWith("{") && email.endsWith("}")) {
            email = JSON.parse(email).email;
        }

        // console.log("Sending email:", email);

        const response = await fetch("https://wback-06q5.onrender.com/api/auth/detail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user:email,email }), // Sends only { email: "shubhamsc9799@gmail.com" }
            credentials: "include",
        });
        

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("Data received:", data);
        return { success: true, data };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, data: { message: "Something went wrong!" } };
    }
};
