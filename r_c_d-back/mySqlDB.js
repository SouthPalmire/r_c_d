import jwt from 'jsonwebtoken';
// const { sign } = pkg;

const dd = jwt.sign({ email: 'qfhhhfxxdxxgfot' }, 'HS384', { expiresIn: '30m' });
console.log(dd);
