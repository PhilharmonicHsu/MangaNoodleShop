"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
/**
* Get user by ID
*
* @param {Request} req
* @param {Response} res
* @returns {void} Returns one user.
*/
const getUsers = (req, res) => {
    res.status(200).json(user_model_1.default.findAll());
};
/**
 * Get user by ID
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Returns one user.
 */
const getUserByUsername = (req, res) => {
    if (req.session && req.session.username) {
        const user = user_model_1.default.findByUsername(req.session.username);
        res.status(200).json(user);
    }
    res.status(401).json({ message: 'User not found!' });
};
/**
 * Add new user
 *
 * @param {Request<{ id: string}>} req
 * @param {Response} res
 * @returns {void} Returns newly created user.
 */
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstname, lastname } = req.body;
    if (!username || !password) {
        res.status(422).json({ message: 'Username/password is empty!' });
        return;
    }
    const user = yield user_model_1.default.create({ username, password, firstname, lastname });
    if (!user) {
        res.status(401).json({ message: 'Username is taken!' });
        return;
    }
    res.status(201).json(user);
});
/**
 * Login user
 *
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void} Returns cookie and redirect.
 */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(401).json({ message: "Username/password is missing!" });
        return;
    }
    const user = yield user_model_1.default.login(username, password);
    if (!user) {
        res.status(401).json({ message: "Username/password is missing!" });
        return;
    }
    if (req.session) {
        req.session.isLoggedIn = true;
        req.session.username = user.username;
    }
    res.status(200).json({ message: "Successfully logged in!" });
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session = null;
    res.status(200).json({
        content: "Session cookie cleared!"
    });
});
exports.default = {
    getUsers,
    getUserByUsername,
    addUser,
    loginUser,
    logout
};
