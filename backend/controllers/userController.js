import { User } from '../models';
import { hash } from 'bcrypt';

export async function listUsers(req, res) {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'role', 'store_id', 'created_at'] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
}

export async function createUser(req, res) {
  try {
    const { username, password, role, store_id } = req.body;
    const password_hash = await hash(password, 10);
    const newUser = await User.create({ username, password_hash, role, store_id });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
}
