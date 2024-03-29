const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const createAdminUser = async (req, res) => {
    try {
        const { full_name, user_name, email, password } = req.body;

        // Validar la entrada del formulario
        const resultValidation = validationResult(req);
        if (!resultValidation.isEmpty()) {
            return res.status(400).json({ errors: resultValidation.array() });
        }

        // Verificar si el correo electrónico ya está en uso
        const emailExists = await User.findOne({ where: { email: email } });
        if (emailExists) {
            return res.status(400).json({ error: 'Este correo electrónico ya existe' });
        }

        // Crear un nuevo usuario en la base de datos
        const hashedPassword = await bcryptjs.hash(password, 10);
        await User.create({
            full_name,
            user_name,
            email,
            password: hashedPassword,
            profile_picture: req.file.filename,
            category_user_id: 1
        });

        return res.status(201).json({ message: 'Registro exitoso' });
    } catch (error) {
        console.error('Error processing admin registration:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const createUser = async (req, res) => {
    try {
        const { full_name, user_name, email, password } = req.body;

        // Validar la entrada del formulario
        const resultValidation = validationResult(req);
        if (!resultValidation.isEmpty()) {
            return res.status(400).json({ errors: resultValidation.array() });
        }

        // Verificar si el correo electrónico ya está en uso
        const emailExists = await User.findOne({ where: { email: email } });
        if (emailExists) {
            return res.status(400).json({ error: 'Este correo electrónico ya existe' });
        }

        // Crear un nuevo usuario en la base de datos
        const hashedPassword = await bcryptjs.hash(password, 10);
        await User.create({
            full_name,
            user_name,
            email,
            password: hashedPassword,
            profile_picture: req.file.filename,
            category_user_id: 2
        });

        return res.status(201).json({ message: 'Registro exitoso' });
    } catch (error) {
        console.error('Error processing registration:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const userList = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'user_name', 'email']
        });

        const userList = users.map(user => ({
            id: user.id,
            name: user.user_name,
            email: user.email,
            url: `http://localhost:4000/api/user/${user.id}`
        }));

        const data = {
            count: userList.length,
            users: userList
        };

        return res.json(data);
    } catch (error) {
        console.error('Error processing user list:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const detailUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        const data = {
            id: id,
            full_name: user.full_name,
            user_name: user.user_name,
            email: user.email,
            image_link: `http://localhost:4000/img/profilePictures/${user.profile_picture}`
        };

        return res.json(data);
    } catch (error) {
        console.error('Error processing user detail:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const editUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { full_name, email, user_name } = req.body;

        let image = req.file ? req.file.filename : null;

        await User.update({
            full_name,
            user_name,
            email,
            profile_picture: image
        }, { where: { id: id } });

        return res.status(200).json({ message: 'Edición guardada exitosamente' });
    } catch (error) {
        console.error('Error saving user edition:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.destroy({ where: { id: id } });
        return res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    createAdminUser,
    createUser,
    userList,
    detailUser,
    editUser,
    deleteUser
};