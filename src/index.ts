import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname,'../.env') })
//create configaraations
let ConfigOptions={
    host:"smtp.gmail.com",
    port:587,
    services:"gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}


//create message

let messageOptions={
    from: 'mashadachris85@gmail.com', 
    to: "mashadachris85@gmail.com", 
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: "<b>Hello world?</b>",
}


//send the message


async function sendMail(mailopts:any){
    //create transporter
    let transporter=nodemailer.createTransport(ConfigOptions);
    //transport email
    await transporter.sendMail(mailopts)
}

sendMail(messageOptions)



console.log("running...")