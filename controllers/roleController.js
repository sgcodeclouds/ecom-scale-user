const roleModel = require('../models/roleModel')

const getRoles = async (req, res) => {
    try {
        const roles = await roleModel.find();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getRoleById = async (req, res) => {
    let role;
    try {
        role = await roleModel.findById(req.params.id);
        if (role == null) {
            return res.status(404).json({ message: 'Cannot find role' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json(role);
}

const createRole = async (req, res) => {

    if(req.body.role === ""){
        res.status(400).json({message: "Please enter role"})
        return;
    }
    
    const role = new roleModel({
        role: req.body.role,
    });
    
    try {
        const newRole = await role.save();
        res.status(201).json(newRole);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateRole = async (req, res) => {
    let role;
    try {
        role = await roleModel.findById(req.params.id);
        if (role == null) {
            return res.status(404).json({ message: 'Cannot find role' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    role.role = req.body.role
    role.permissions = req.body.permissions

    role.save()

    res.status(200).json(role);
}

const deleteRole = async (req, res) => {
    let role;
    try {
        role = await roleModel.findById(req.params.id);
        if (role == null) {
            return res.status(404).json({ message: 'Cannot find role' });
        }

        try {
            await role.deleteOne({ _id: req.params.id });
            res.json({ deleted:true, message: 'Role deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}



module.exports.getRoles = getRoles
module.exports.getRoleById = getRoleById
module.exports.createRole = createRole
module.exports.updateRole = updateRole
module.exports.deleteRole = deleteRole