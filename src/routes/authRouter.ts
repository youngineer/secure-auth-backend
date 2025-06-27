import express from 'express';


const authRouter = express.Router();


authRouter.post("/auth/signup", (req, resp) => {
    const { name, emailId, password } = req.body();
    
})