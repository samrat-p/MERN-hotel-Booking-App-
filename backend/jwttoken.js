const jwt = require('jsonwebtoken');

const token = 'cTiOmy1Y5KC5up9nAHRkBzMuGo88F5qW'; // Replace with the actual JWT token
const decodedToken = jwt.decode(token);
console.log(decodedToken)

if (decodedToken && decodedToken.exp) {
  const expirationTimestamp = decodedToken.exp * 1000; // Convert seconds to milliseconds
  const currentTimestamp = Date.now();

  if (expirationTimestamp < currentTimestamp) {
    console.log('Token has expired');
  } else {
    console.log('Token is still valid');
  }
} else {
  console.log('Invalid or missing expiration claim in token');
}
