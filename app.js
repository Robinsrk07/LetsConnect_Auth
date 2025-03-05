const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { NotFoundError, ValidationError, AuthenticationError } = require('./src/application/errors/customError');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const{authController,updatePassword,updateUser,IspremiumUpdate}=require("./container")

updatePassword.connect().then(()=>updatePassword.listen())
updateUser.connect().then(()=>updateUser.listen())
IspremiumUpdate.connect().then(()=>IspremiumUpdate.listen())



const GRPCServer = require('./src/infrastructure/grpc/server');
const AuthenticateUser = require('./src/application/use-cases/AuthenticateUser');
const AuthHandler = require('./src/infrastructure/grpc/handlers/authHandler');

const authUseCase = new AuthenticateUser();
const authHandler = new AuthHandler(authUseCase);
const server = new GRPCServer(authHandler);

server.start(50051);

app.post('/auth/signup', (req, res, next) => authController.signUp(req, res, next));
app.post('/auth/login', (req, res, next) => authController.login(req, res, next));
app.post('/auth/logout', (req, res, next) => authController.logout(req, res, next));
app.post('/auth/send-otp', (req, res, next) => authController.SendOtp(req, res, next));
app.post('/auth/verify-otp', (req, res, next) => authController.VerifyOtp(req, res, next));

// Error Handling
app.use((err, req, res, next) => {
    if (err instanceof NotFoundError) {
        return res.status(404).json({ message: err.message });
    }
    if (err instanceof ValidationError) {
        return res.status(400).json({ message: err.message });
    }
    if (err instanceof AuthenticationError) {
        return res.status(401).json({ message: err.message });
    }
    res.status(500).json({ message:err.message });
});

// Database Connection
mongoose.connect("mongodb+srv://ROBINSRK:ROBINSRK123@letsconnect.z1hp8.mongodb.net/?retryWrites=true&w=majority&appName=LetsConnect", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected successfully');
        app.listen(8080, () => console.log('Server running on port 8080'));
    })
    .catch((err) => console.error('Database connection error:', err));