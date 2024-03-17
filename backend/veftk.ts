import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined in the environment variables.');
}

const verifyToken = (token: string): Promise<jwt.JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as jwt.JwtPayload);
      }
    });
  });
};

const app = express();

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
    req.token = token; // Attach token to the request object
  }
  next();
});

app.get('/verify-token', (req, res) => {
  const token = req.token; // Get the token from the request object

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  verifyToken(token)
    .then((payload) => {
      res.json({ valid: true, payload });
    })
    .catch((err) => {
      res.status(401).json({ valid: false, error: err.message });
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});