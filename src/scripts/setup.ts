import bcrypt from 'bcrypt'
import User from "../models/user"
import { UserRole } from '../types/types';

const DEFAULT_ADMIN_USERNAME = process.env.DEFAULT_ADMIN_USERNAME
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD

async function initialSetup() {
    try {
        const existingAdmin = await User.findOne({ role: UserRole.Admin });
        if (!existingAdmin) {
            if (!DEFAULT_ADMIN_USERNAME || !DEFAULT_ADMIN_PASSWORD) {
                throw new Error('Missing DEFAULT_ADMIN_USERNAME and/or DEFAULT_ADMIN_PASSWORD for default Admin')
            }

            const admin = {
                role: UserRole.Admin,
                username: DEFAULT_ADMIN_USERNAME,
                password: DEFAULT_ADMIN_PASSWORD,
            };

            const hashedPassword = await bcrypt.hash(admin.password, 10);
            const newAdmin = new User({
                role: admin.role,
                username: admin.username,
                password: hashedPassword,
            });
            
            await newAdmin.save();
            console.log('Default Admin created');
        }
    } catch (error) {
        console.error('Error creating default Admin:', error);
    }
}

export default initialSetup