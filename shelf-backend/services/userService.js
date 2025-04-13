import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, '../data/users.json');

export const readUsers = () => {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
};

export const findUserByEmailAndPassword = (email, password) => {
    const users = readUsers();
    return users.find(user => user.email === email && user.password === password);
};

export const createUser = (email, password, name, mobile, role) => {

    const users = readUsers();
    const newUser = {
        id: Date.now().toString(),

        email, password, name, mobile, role
    };
    users.push(newUser);
    writeUser(users);
    return newUser;
}

export const writeUser = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
};