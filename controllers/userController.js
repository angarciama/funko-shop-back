const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/users/User');

exports.createUser = async (req, res) => {
    try {
        // Validar la entrada del formulario
        const resultValidation = validationResult(req);
        if (!resultValidation.isEmpty()) {
            return res.status(400).json({ errors: resultValidation.array() });
        }

        // Verificar si el correo electrónico ya está en uso
        const emailExists = await User.findOne({ where: { email: req.body.email } });
        if (emailExists) {
            return res.status(400).json({ error: 'Este correo electrónico ya existe' });
        }

        // Crear un nuevo usuario en la base de datos
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        const user = await User.create({
            full_name: req.body.full_name,
            user_name: req.body.user_name,
            email: req.body.email,
            password: hashedPassword,
            profile_picture: req.body.profile_picture,
            category_user_id: req.body.category_user_id,
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        if (!users) {
            return res.status(404).json({ error: 'Users not found' });
        }

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error processing user detail:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        await User.update({
            full_name: req.body.full_name,
            user_name: req.body.user_name,
            email: req.body.email,
            password: hashedPassword,
            profile_picture: req.body.profile_picture,
        }, { where: { id: user } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};