// uploadFiles.js

export const uploadFiles = async (images) => {

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
console.log("email at uploadfile",email);
  const formData = new FormData();

  // Append all images to the FormData object
  images.forEach((image, index) => {
    formData.append(`image${index}`, image);
  });

  try {
    // Send the images to the server using a POST request
    const response = await fetch("https://wback-06q5.onrender.com/upload/uploadPic", {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({ user:email,formData}), 
      // body: formData, // FormData automatically sets the correct Content-Type
    });

    if (!response.ok) {
      throw new Error("Failed to upload images");
    }

    // Parse the JSON response to get the URLs of the uploaded images
    const data = await response.json();
    return data.imageUrls; // Assuming the server sends back an array of URLs
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error; // Rethrow the error to be handled in the component
  }
};
