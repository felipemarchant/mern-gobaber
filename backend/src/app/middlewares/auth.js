import jwt from 'jsonwebtoken';
import { secret } from '../../config/auth';
import { promisify } from 'util';

export default async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Token not provided' });
    const [, token] = auth.split(' ');
    try {
        const decoded = await promisify(jwt.verify)(token, secret);
        req.userId = decoded.id;
    } catch(err) {
        return res.status(401).json({ error: 'Token invavlid' });
    }
    return next();
}