import nodemailer from 'nodemailer'
import mssql from 'mssql'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname,'../.env') })

let configOptions={
    host:"smtp.gmail.com",
    port:587,
    services:"gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}

//create a function to create a transporter

export function createTransporter(configOpts:any){
    return nodemailer.createTransport(configOpts)
}

// create a function to send emails


export async function sendMail(messageOptions:any){
    // create trasporter
    let transporter= createTransporter(configOptions)

    await transporter.sendMail(messageOptions, (err,html)=>{
        console.log(html);
        
    })
}
