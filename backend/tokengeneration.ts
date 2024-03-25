const jwt = require('jsonwebtoken');

const generateToken = () => {
  const payload = { userId: "65f75dd62a65121bbb9a4ffe" };
  const secretKey = 'cTiOmy1Y5KC5up9nAHRkBzMuGo88F5qW';
  const options = { expiresIn: '10d' };
  
  const token = jwt.sign(payload, secretKey, options);
  
  console.log('Generated Token:', token); // Log the generated token
  return token;
}

// Call the function to generate the token
generateToken();

function isUserLoggedIn() {
    // Logic to check if the user is logged in (e.g., checking for authentication token)
    // Return true if the user is logged in, false otherwise
    return !!localStorage.getItem('authToken'); // Example: Check if authentication token exists in local storage
}

// Log whether the user is logged in or not
console.log('User is logged in:', isUserLoggedIn());