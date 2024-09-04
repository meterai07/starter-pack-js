// npm install mongoose uuid

const repositories = require('../repositories/role_repository');
const { v4: uuidv4 } = require('uuid');


// Function to create a new role
const create = async (roleData) => {
    try {
        const roleId = uuidv4();
        const role = {
            role_id: roleId,
            ...roleData
        };
        const createdRole = await repositories.create(role);
        return createdRole;
    } catch (error) {
        throw new Error('Failed to create role');
    }
};

// Function to get list of roles
const getList = async () => {
    try {
        const roles = await repositories.findAll();
        return roles;
    } catch (error) {
        throw new Error('Failed to get list of roles');
    }
}

const getOneByRoleId = async (roleId) => {
    try {
        const role = await repositories.getOneByRoleId(roleId);
        return role;
    } catch (error) {
        throw new Error('Failed to get role by ID');
    }
}

const updateOneByRoleId = async (roleId, roleData) => {
    try {
        const role = await repositories.getOneByRoleId(roleId);
        if (!role) {
            throw new Error('Role not found');
        }
        const updatedRole = await repositories.updateOne(roleId, roleData);
        return updatedRole;
    } catch (error) {
        throw new Error('Failed to update role by ID');
    }
}

async function deleteOneByRoleId(roleId) {
    try {
        const role = await repositories.deleteOneByRoleId(roleId);
        return role;
    } catch (error) {
        throw new Error('Failed to delete role by ID');
    }
}

module.exports = { create, getList, getOneByRoleId, updateOneByRoleId, deleteOneByRoleId };