const userModel = require('../models/userModel')
// const emailUtils = require('../utils/emailUtil')
const appUtil = require('../utils/appUtil')

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().populate('role');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getUserById = async (req, res) => {
    let user;
    try {
        user = await userModel.findById(req.params.id).populate('role');
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json(user);
}

const createUser = async (req, res) => {

    if(req.body.name === "" || req.body.email === "" || req.body.phone === "" || req.body.password === "" || req.body.isVerified === ""){
        res.status(400).json({message: "Please enter name, email, phone, password, isVerified"})
        return;
    }
    
    const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role: req.body.role,
        isVerified: req.body.isVerified,
        emailOtp: appUtil.generateOtp()
    });
    
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {
    let user;
    try {
        user = await userModel.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    user.name = req.body.name
    user.email = req.body.email
    user.phone = req.body.phone
    user.password = req.body.password
    user.role = req.body.role
    user.isVerified = req.body.isVerified

    user.save()

    res.status(200).json(user);
}

const deleteUser = async (req, res) => {
    let user;
    try {
        user = await userModel.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }

        try {
            await user.deleteOne({ _id: req.params.id });
            res.json({ deleted:true, message: 'User deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}



module.exports.getUsers = getUsers
module.exports.getUserById = getUserById
module.exports.createUser = createUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser