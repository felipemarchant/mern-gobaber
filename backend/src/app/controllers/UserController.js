import User from '../models/User';
import * as Yup from 'yup';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });
        if (!(await schema.isValid(req.body))) 
            return res.status(400).json({ error: 'Validation fails' });
        const exists = await User.findOne({ where: { email: req.body.email } });
        if (exists) return res.status(400).json({ error: 'User already exists.' });
        const { id, name, email, provider } = await User.create(req.body);
        return res.json({ id, name, email, provider });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            password: Yup.string().min(6),
            oldPassoword: Yup.string().min(6),
            passoword: Yup.string().min(6).when('oldPassoword', (oldPassoword, field) => 
                oldPassoword ? field.required() : field
            ),
            confirmPassword: Yup.string().when('passoword', (passoword, field) => 
                passoword ? field.required().oneOf([Yup.ref('passoword')]) : field
            )
        });
        if (!(await schema.isValid(req.body))) 
            return res.status(400).json({ error: 'Validation fails' });
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