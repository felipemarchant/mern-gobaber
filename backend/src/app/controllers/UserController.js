import User from '../models/User';

class UserController {
    async store(req, res) {
        const exists = await User.findOne({ where: { email: req.body.email } });
        if (exists) return res.status(400).json({ error: 'User already exists.' });
        const { id, name, email, provider } = await User.create(req.body);
        return res.json({ id, name, email, provider });
    }

    async update(req, res) {
        const { email, oldPassoword } = req.body;
        const user = await User.findByPk(req.userId);
        if (email !== user.email) {
            const exists = await User.findOne({ where: { email }});
            if (exists) return res.status(400).json({ error: 'User already exists.' });
        }
        if (oldPassoword && !(await user.checkPassword(oldPassoword)))
            return res.status(401).json({ error: 'Password does not match' });
        const { id, name, provider } = await user.update(req.body);
        return res.json({ id, name, provider});
    }
}

export default new UserController();