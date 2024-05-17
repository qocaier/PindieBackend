const users = require("../models/user");
const bcrypt = require("bcryptjs");

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "������� ���, email � ������" }));
    } else {
        next();
    }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
    if (!req.body.username || !req.body.email) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "������� ��� � email" }));
    } else {
        next();
    }
};

const checkIsUserExists = async (req, res, next) => {
    const isInArray = req.usersArray.find((user) => {
        return req.body.email === user.email;
    });
    if (isInArray) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "������������ � ����� email ��� ����������" }));
    } else {
        next();
    }
};

const hashPassword = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        next();
    } catch (error) {
        res.status(400).send({ message: "������ ����������� ������" });
    }
};

const findAllUsers = async (req, res, next) => {
    console.log("GET /api/users");
    req.usersArray = await users.find({}, { password: 0 });
    next();
}

const findUserById = async (req, res, next) => {
    console.log("GET /api/users/:id");
    try {
        req.user = await users.findById(req.params.id, { password: 0 });
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "������������ �� ������" }));
    }
};

const createUser = async (req, res, next) => {
    console.log("POST /api/users");
    try {
        console.log(req.body);
        req.user = await users.create(req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "������ �������� ������������" }));
    }
};

const updateUser = async (req, res, next) => {
    console.log("PUT /api/users/:id");
    try {
        req.user = await users.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "������ ���������� ������������" }));
    }
};

const deleteUser = async (req, res, next) => {
    console.log("DELETE /api/users/:id");
    try {
        req.user = await users.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "������ �������� ������������" }));
    }
};


module.exports = { findAllUsers, createUser, findUserById, hashPassword, updateUser, deleteUser, checkEmptyNameAndEmailAndPassword, checkEmptyNameAndEmail, checkIsUserExists };