import { findUserByEmailAndPassword, createUser } from '../services/userService.js';

export const login = (req, res) => {
    const { email, password } = req.body;
    const user = findUserByEmailAndPassword(email, password);

    if (user) {
        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            }
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
};
export const register = (req, res) => {
    const { email, password, name
        , mobile, role
    } = req.body;
    if (!email || !password || !name ||
        !mobile || !role) {
        res.status(401).json({ success: false, message: 'all fields are required' })
    }
    const user = createUser(email, password, name, mobile, role);

    if (user) {
        res.json({
            success: true,
            message: 'register successful',
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            }
        });
    }
};
