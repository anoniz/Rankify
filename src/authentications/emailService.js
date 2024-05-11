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
// Import specific members from nodemailer
const nodemailer = __importStar(require("nodemailer"));
const generateCode_1 = __importDefault(require("../utils/generateCode"));
const from_email = process.env.FROM_EMAIL;
const password = process.env.PASSWORD;
const smtp = process.env.SMTP;
console.log(from_email, password, smtp);
console.log((0, generateCode_1.default)());
// Create a transporter
const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    auth: {
        user: process.env.USER,
        pass: password
    }
});
// Define email options
const mailOptions = {
    from: from_email,
    to: 'abdullatifnizamani517@gmail.com',
    subject: 'hi there',
    text: 'Hello from TypeScript!'
};
// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    }
    else {
        console.log('Email sent:', info.messageId);
    }
});
function sendVerificationCode(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: from_email,
            to: email,
            subject: 'Verification Code',
            text: `${(0, generateCode_1.default)()}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return { error };
            }
            else {
                console.log('Email sent:', info.messageId);
                return { info };
            }
        });
        return {};
    });
}
exports.default = sendVerificationCode;
