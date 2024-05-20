# MERN Hotel Booking App

## Overview
This project is a full-stack web application for hotel booking, built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It includes features for user authentication, hotel management, booking management, and more.

## Features
- **User Authentication:** Registration, login, and JWT-based authentication.
- **Hotel Management:** Create, read, update, and delete hotel details.
- **Booking Management:** Users can book hotels, and admins can manage bookings.
- **Search and Filter:** Search for hotels based on various criteria.
- **Payment Integration:** Secure payments using Stripe.

## Folder Structure
- **backend:** Contains the server-side code, including routes, controllers, models, and configuration files.
- **frontend:** Contains the client-side code, built with React.
- **e2e-tests:** Contains end-to-end tests for the application.

## Technologies Used
- **Frontend:** React, Redux, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT
- **Payments:** Stripe
- **Testing:** Jest, Cypress

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/samrat-p/MERN-hotel-Booking-App-.git
2. Install dependencies for both frontend and backend:
    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
3. Set up environment variables:
- Create a .env file in the backend directory and add the necessary configurations (e.g., MongoDB URI, JWT secret).
### Run the Application
1. In the backend directory:
    ```bash
    npm start
2. In the frontend directory:
    ```bash
    npm start
### Usage
- Open your browser and go to http://localhost:3000 to see the frontend.
- The backend runs on http://localhost:5000.
### Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Commit your changes (git commit -am 'Add some feature').
4. Push to the branch (git push origin feature/YourFeature).
5. Open a pull request.
### License
This project is licensed under the MIT License.
### Contact
For any inquiries, you can contact the project maintainer via the GitHub repository.