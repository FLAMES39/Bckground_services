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
const nodemailer_1 = __importDefault(require("nodemailer"));
const mssql_1 = __importDefault(require("mssql"));
const ejs_1 = __importDefault(require("ejs"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
//create configaraations
let ConfigOptions = {
    host: "smtp.gmail.com",
    port: 587,
    services: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
};
const fetchUserFromDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //first configure sql connection
        const config = {
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            server: process.env.DB_SERVER,
            database: process.env.DB_NAME
        };
        //connect to the database
        yield mssql_1.default.connect(config);
        //Stored procedure or query to fetch the user data
        const query = 'SELECT name, email FROM Users WHERE IsDelete=0';
        //execute the query and get the result
        const userInfo = yield mssql_1.default.query(query);
        //close the mssql connection
        yield sql.close();
        //return the fetched user data
        return userInfo.recordset;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
ejs_1.default.renderFile('Template/email.ejs', { name: "Christian", message: "Don't miss out on the latest updates and offers. Click the button below to stay connected:" }, (err, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield fetchUserFromDatabase();
        for (let user of users) {
            const { name, email } = user;
        }
        console.log(html);
        let messageOptions = {
            from: 'mashadachris85@gmail.com',
            to: email,
            subject: "Hello ✔",
            html,
            attachments: [
                {
                    // filename: 'text1.txt',
                    // content: 'hello world!'
                    path: __dirname + '/email.pdf'
                }
            ]
        };
        //create transporter
        let transporter = nodemailer_1.default.createTransport(ConfigOptions);
        //transport or send email
        yield transporter.sendMail(messageOptions);
    }
    catch (error) {
        console.log(error);
    }
}));
//send the message
// async function sendMail(mailopts:any){
//     //create transporter
//     let transporter=nodemailer.createTransport(ConfigOptions);
//     //transport email
//     await transporter.sendMail(mailopts)
// }
// sendMail(messageOptions)
console.log("running...");
