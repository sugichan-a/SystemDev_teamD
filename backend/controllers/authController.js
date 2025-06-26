import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { User } from '../models';

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    const valid = await compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: 'Invalid username or password' });

    const payload = { id: user.id, role: user.role, store_id: user.store_id };
    const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
