"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.login = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const { userService } = require('../services/index');
// const bcrypt  = require('bcrypt');
// const jwt = require('jsonwebtoken');
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = __importDefault(require("../models/token"));
const emailService_1 = __importDefault(require("../authentications/emailService"));
const JWT_SECRET = process.env.JWT_SECRET;
// type UserToken = {
//     userId:string,
//     userPassword:string,
//     token:number
// }
const verifyCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userToken = Object.assign({}, req.body.token);
        const token = yield token_1.default.findByPk(userToken.email);
        if (!token) {
            return res.status(404).send({ "message": "token not found" });
        }
        // now we have found the token so we can create the user
        req.body.user = {
            email: token.dataValues.userId,
            password: token.dataValues.userPass,
            name: token.dataValues.userId.split('.')[0].toUpperCase()
        };
        // create user;
        yield createUser(req, res);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ "message": "something went wrong in userController create user" });
    }
});
const sendCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = Object.assign({}, req.body.user);
        const resp = yield token_1.default.create(user);
        const sendToken = yield (0, emailService_1.default)(user.email);
        if (sendToken.error) {
            return res.status(500).send({ "message": "something went wrong in userController sendCode" });
        }
        return res.status(200).send("Verification Code sent successfully, please check your email address");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ "message": "something went wrong in userController create user" });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = Object.assign({}, req.body.user);
        // lets see if user is already there
        const dbUser = yield userService.getUser(user.email);
        if (dbUser.user) {
            return res.status(403).json({ "message": "user already exits" });
        }
        // encrypt the password before saving in db
        user.password = yield bcrypt.hash(user.password, 8);
        const newUser = yield userService.createUser(user);
        if (newUser.error) {
            return res.status(newUser.error.code).send(newUser.error.message);
        }
        // create and send token
        const token = jsonwebtoken_1.default.sign({ user: { email: user.email, name: user.name } }, JWT_SECRET);
        return res.status(201).json(token);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ "message": "something went wrong in userController create user" });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userService.getUser(email);
        if (user.error) {
            return res.status(404).json({ "message": "user doesnt exists" });
        }
        // let compare both passwords;
        const isMatch = yield bcrypt.compare(password, user.user.dataValues.password);
        if (isMatch) {
            // create and send token
            const token = jsonwebtoken_1.default.sign({ user: { email: user.email, name: user.name } }, JWT_SECRET);
            return res.status(201).json(token);
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ "message": "something went wrong in userController login user" });
    }
});
exports.login = login;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getUser(req.params.email);
        if (!user) {
            return res.status(404).send({ "user": user, "message": "user not found" });
        }
        if (user.error) {
            return res.status(user.error.code).send(user.error.message);
        }
        return res.send({ "user": user, "message": "user found sucess" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ "message": "something went wrong in UserController findByID" });
    }
});
exports.getUserById = getUserById;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getAllUsers();
        return res.status(200).send({ "user": user, "message": "found all" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ "message": "something went wrong in UserController findAll" });
    }
});
exports.getAllUsers = getAllUsers;
