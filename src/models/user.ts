import mongoose from 'mongoose';
import { UserRole } from '../types/types';

const userSchema = new mongoose.Schema({
    role: {
        type: Number,
        enum: [UserRole.User, UserRole.Admin],
        default: UserRole.User,
    },
    username: {
        type: String,
        required: true,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        maxLength: 100,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User