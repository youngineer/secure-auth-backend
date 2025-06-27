import validator from 'validator';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { BaseError } from './errors';


export const isValidEntry = (name: string, email: string, password: string): boolean => {
    if (!validator.isAlpha(name)) {
        throw new BaseError("Name should contain only alphabets", { context: { name } });
    }

    if (!validator.isEmail(email)) {
        throw new BaseError("Invalid email address", { context: { email } });
    }

    if (!validator.isStrongPassword(password)) {
        throw new BaseError("Password is weak", { context: { password } });
    }

    return true;
};



export const generateJwt = (emailId: string): string => {
    return jwt.sign({emailId: emailId}, "kartikS@123");
}


export const generatePasswordHash = (password: string): string => {
    return bcrypt.hashSync(password, 10);
};


export const isPasswordValid = (userPassword: string, passwordFromDb: string): boolean => {
    if(!bcrypt.compareSync(userPassword, passwordFromDb)) {
        throw new BaseError("Passwords do not match", { context: userPassword });
    };

    return bcrypt.compareSync(userPassword, passwordFromDb);
}