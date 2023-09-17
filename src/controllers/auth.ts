import User from "../models/user";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import { IUser } from "../types/types";
import 'dotenv/config'

const SECRET = process.env.SECRET

function generateToken(user: Partial<IUser>) {
    if (!SECRET) {
        throw new Error("SECRET is missing")
    }

    return jwt.sign({ id: user.id, role: user.role, username: user.username }, SECRET, {
        expiresIn: '1h',
    });
}

async function signUp(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Missing required data: username or password' })
        }

        const existingUser = await User.findOne({ username }) as IUser;
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        console.log(user)
        await user.save();

        const token = generateToken(user);
        res.status(201).json({
            message: 'User signed up',
            user: { id: user.id, role: user.role, username: user.username, token }
        });
    } catch (error) {
        console.error('Sign up error', error);
        res.status(500).json({ error: 'Sign up error' });
    }
}

async function signIn(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Missing required data: username or password' })
        }

        const user = await User.findOne({ username }) as IUser;
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        const token = generateToken(user);
        res.status(200).json({
            message: 'User signed in',
            user: { id: user.id, role: user.role, username: user.username, token }
        });
    } catch (error) {
        console.error('Sign in error', error);
        res.status(500).json({ error: 'Sign in error' });
    }
};

export { signUp, signIn };
