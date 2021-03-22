// TODO: Use database
const users = [{
    id: '1',
    email: 'first@gmail.com',
    password: 'password',
}, {
    id: '2',
    email: 'second@gmail.com',
    password: 'password',
}];

export function findUser(email, password) {
    if (isFinite(email)) {
        const userId = email;
        return users.find(user => user.id === userId);
    }
    if (password == null) {
        return users.find(user => user.email === email);
    }
    return users.find(user => user.email === email && user.password === password);
}
